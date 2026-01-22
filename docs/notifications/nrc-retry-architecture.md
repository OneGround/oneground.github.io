---
title: "How does the retry system for notifications work?"
description: "Overview of the Notifications system architecture, detailing retry strategies with Polly and Hangfire, circuit breaker patterns, and HTTP status code handling."
keywords: [notifications, architecture, polly, hangfire, circuit breaker, retry, webhook, OneGround, ZGW]
slug: /notifications/notification-retry-architecture
---

# How does the retry system for notifications work?

When a ZGW entity is created, modified, or deleted, a notification is sent. Client applications can subscribe to these notifications. This requires a webhook receiver on the client side to which the notifications can be delivered. The URL (and authentication) of this webhook receiver is stored in the client's subscription in our Notifications database.

There are four key components to the Notifications system:

1. Polly retries
2. Hangfire retries and priority queue
3. Circuit breaker
4. HTTP status codes that lead to retries

## Polly retries

If a notification cannot be delivered to a client webhook receiver (for example, because the service is temporarily down), a new attempt is made to deliver the notification within a few seconds. Both the interval pattern (linear/exponential) and the number of attempts can be configured. An important aspect of Polly retries is that they are blocking calls; therefore, it is crucial to ensure that the total retry sequence is not too long (e.g., &lt;8 seconds). Another key characteristic is that Polly retries are not persistent (i.e., they take place in memory). A typical Polly retry configuration looks like this:

```json
{
    "PollyConfig": {
        "NotificatiesSender": {
            "Retry": {
                "ShouldRetryAfterHeader": true,
                "MaxRetryAttempts": 4,
                "BackoffType": "Exponential",
                "UseJitter": false,
                "Delay": "00:00:00.500"
            },
            "Timeout": {
                "Timeout": "00:00:30"
            }
        }
    }
}
```

The Polly retries are performed at the following times:

- 500 msec.
- 1 sec.
- 2 sec.
- 4 sec.

## Hangfire retries and priority queue

The second level of retries is based on the Hangfire Scheduler. It is possible that the client webhook receiver is down for an extended period. In this case, the Polly retry will not work. Hangfire retries offer a solution by scheduling retries to be processed at a later time, for example, after four hours or even several days. Unlike Polly retries, Hangfire retries are persistent (stored as jobs in the Notifications database). Hangfire retries use two queues: the MAIN and RETRY queues. New notifications are placed in the MAIN queue, while scheduled retries are placed in the RETRY queue. This prevents new notifications from waiting until all retries have been processed, as only a limited number of jobs can be executed continuously. More importantly, the retry period can be extended (e.g., up to one day).

After the last failed retry, Hangfire moves the retry job to the 'Failed Jobs' state.

A nice feature is that Hangfire includes a Dashboard that displays all jobs (Retry Jobs, Successfully Executed Jobs, Failed Jobs, and Deleted Jobs). Failed jobs can even be restarted manually.

A typical Hangfire retry configuration looks like this:

```json
{
    "Hangfire": {
        "RetrySchedule": "0.00:15;0.00:30;0.01:00;0.04:00;1.00:00",
        "ExpireFailedJobsScanAt": "05:00",
        "ExpireFailedJobAfter": "7.00:00"
    }
}
```

The retry pattern (configured in RetrySchedule) is:

- 15 minutes
- 30 minutes
- 1 hour
- 4 hours
- 1 day

There are two other settings intended for automatically cleaning up failed retry jobs:

- ExpireFailedJobsScanAt (scan interval or the value: 'never', 'disabled', 'n/a')
- ExpireFailedJobAfter (period that failed jobs must continue to exist)

## Circuit breaker

Another component of the notification system is the circuit breaker. This prevents the system from repeatedly attempting to contact unresponsive (or faulty) webhook receivers over a period of time, which can severely and unnecessarily block resources (due to timeouts).

The concept is that a webhook receiver is only allowed to fail a limited number of times. When calls to a webhook receiver fail, the failures are monitored and recorded. For example, after 10 failures, the webhook receiver is marked as BLOCKED (and effectively no longer monitored). The circuit breaker maintains this block for a specified period (e.g., 5 minutes). After this period, it attempts to deliver the notification again. If the receiver fails again, the block is reapplied. This mechanism prevents unnecessary calls to unresponsive webhook receivers, improving system performance.

All webhook receiver blocks are automatically released after a specified period unless triggered again.

A typical Circuit breaker configuration looks like this:

```json
{
    "CircuitBreaker": {
        "FailureThreshold": 10,
        "BreakDuration": "00:05:00",
        "CacheExpirationMinutes": 10
    }
}
```

The possible settings under CircuitBreaker are:

- FailureThreshold (number of times you can fail before the BLOCKADE takes effect)
- BreakDuration (time of the BLOCKADE)
- CacheExpirationMinutes (time that MONITORING and BLOCKS are lifted unless called)

## HTTP status codes triggering retries

### Polly retry

Polly will perform retries according to the configured policy for the following HTTP status codes:

- `HttpRequestException`
- All HTTP 5xx codes
- 408 Request Timeout
- 429 Too Many Requests

When other HTTP status codes are returned, Polly stops immediately (but Hangfire will retry).

It's possible to configure retries on additional HTTP status codes. This can be done using the AddRetryOnHttpStatusCodes setting directly under PollyConfig. If, for example, you want to retry always on unauthorized (401) errors, you can configure this with the following line:

```json
{
    "PollyConfig": {
        "NotificatiesSender": {
            "Retry": {
                "ShouldRetryAfterHeader": true,
                "MaxRetryAttempts": 4,
                "BackoffType": "Exponential",
                "UseJitter": true,
                "Delay": "00:00:00.500"
            },
            "Timeout": {
                "Timeout": "00:00:30"
            },
            "AddRetryOnHttpStatusCodes": "404;..."
        }
    }
}
```

### Hangfire retry

The hangfire retry jobs make no distinction between different response codes and will always perform a retry.
