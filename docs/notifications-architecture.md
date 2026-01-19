---
title: "Notifications Architecture"
description: "Overview of the Notifications system architecture, detailing retry strategies with Polly and Hangfire, circuit breaker patterns, and HTTP status code handling."
keywords: [notifications, architecture, polly, hangfire, circuit breaker, retry, webhook, OneGround, ZGW]
---

# Notifications

When creating, modifying, or deleting each ZGW entity, a notification is sent. Clients (client apps) can subscribe to these notifications. This requires a client (client app) webhook receiver to which the notifications can be delivered. The URL (and authentication) of this webhook receiver is stored in the client's subscription in our Notifications database.
There are four key components to the Notifications system:

1. Polly retries
2. Hangfire retries and priority queue
3. Circuit breaker
4. Http codes that lead to retries

## Polly retries

If a notification cannot be delivered to a client webhook receiver, for example, because the service is (temporarily) down, a new attempt will be made to deliver the notification within a few seconds. Both the interval pattern (linear/exponential) and the number of attempts can be configured. An important aspect of Polly retry is that it is a blocking call, so it is important to ensure that the total retry sequence is not too long (<8 seconds). Another important aspect of Polly retry is that retries are not persistent (i.e., they take place in memory). A typical Polly retry looks like this:

![alt text](image.png)

## Hangfire retries and priority queue

The second level of retries is based on the Hangfire Scheduler. It's possible that the client webhook receiver is down for an extended period. In this case, the Polly retry won't work. The Hangfire retry offers a solution because retries are scheduled and picked up and processed at a (much) later time, for example, after four hours or even after several days. Unlike Polly retries, Hangfire retries are persistent (stored as jobs in the Notification database). Hangfire retries use two queues: the MAIN and RETRY queues. New notifications are placed in the MAIN queue, while scheduled retries are placed in the RETRY queue. This prevents new notifications from having to wait until all retries have been processed, as only a limited number of jobs can be executed. More importantly, the retry period can be long, for example, one day.

After the last failed retry, Hangfire will move the retry(job) to Failed Jobs.

A nice feature is that Hangfire includes a Dashboard that displays all jobs (Retry Jobs, Successfully Executed Jobs, Failed Jobs, and Deleted Jobs). Failed jobs can even be restarted manually.

A typical Hangfire retry configuration looks like this:

![alt text](image-1.png)

The retry pattern (configured in RetrySchedule) is:

* 15 minutes
* 30 minutes
* 1 hour
* 4 hours
* 1 day

There are two other settings intended for automatically cleaning up failed retry jobs:

* ExpireFailedJobsScanAt (scan interval or the value: 'never', 'disabled', 'n/a')
* ExpireFailedJobAfter (period that failed jobs must continue to exist)

## Circuit breaker

Another component of the notification system is the circuit breaker. The circuit breaker prevents unresponsive (or faulty) webhook receivers from repeatedly reporting an error over a period of time. This can severely and unnecessarily block the system (think of unnecessary timeouts). The idea is that a webhook receiver is only allowed to fail a limited number of times. If a webhook receiver fails, it is MONITORED, and the number of failures is recorded. For example, after 10 failures, the webhook receiver is marked as BLOCKED (and therefore no longer MONITORED). The circuit breaker maintains this block for a specified period, for example, 5 minutes. After this, it tries to deliver the notification again. If the receiver fails again (maximum 10 times), the block occurs again. This mechanism prevents unnecessary calls to unresponsive webhook receivers, which helps improve system performance.

All webhook receiver blocks will be automatically released after a certain period of time (unless called within this time).

A typical Circuit breaker configuration looks like this:

![alt text](image-2.png)

The possible settings under CircuitBreaker are:

* FailureThreshold (number of times you can fail before the BLOCKADE takes effect)
* BreakDuration (time of the BLOCKADE)
* CacheExpirationMinutes (time that MONITORING and BLOCKS are lifted unless called)

## Http codes that lead to retries

### Polly retry

Polly will perform retries according to the configured policy for the following HTTP status codes:

* HttpRequestException
* All HTTP 5xx codes
* 408 Request Timeout
* 429 TooManyRequests

With the other HTTP status codes, the error is returned immediately.

It's possible to perform a retry on HTTP status codes that aren't supported by Polly. This can be done using the AddRetryOnHttpStatusCodes setting directly under PollyConfig. Multiple codes are supported. So, if you want to perform a retry on a NotFound (404) error, you can configure this with the following line:

![alt text](image-3.png)

### Hangfire retry

Hangfire retry makes no distinction and will always perform a retry.
