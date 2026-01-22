---
title: "Introduction to Notifications"
description: "Overview of the ZGW Notifications (NRC) system, enabling real-time updates via webhooks."
keywords: [notifications, introduction, NRC, webhooks, ZGW, API, OneGround, subscription]
slug: /notifications/introduction
---

# Introduction to Notifications

The Notifications system (often referred to as **NRC** or Notification Routing Component) is a crucial part of the ZGW API landscape provided by OneGround. It allows client applications to stay synchronized with the state of data within the ZGW APIs without the need for constant polling.

## How it works

When a relevant event occurs within a ZGW API (such as the creation of a Case/Zaak, or an update to a Document/EnkelvoudigInformatieObject), a notification is generated. The NRC is responsible for routing these notifications to the appropriate subscribers.

1. **Events**: Changes occur in the source systems (OpenZaak, OpenNotificaties, etc.).
2. **Notifications**: A notification message is published.
3. **NRC**: The component enables the routing and delivery of these messages.
4. **Subscribers**: External applications receive these updates via **webhooks**.

## Getting Started

To receive notifications, your application needs to:

1. **Expose a Webhook Endpoint**: A public or internally accessible URL that can accept HTTP POST requests containing the notification payload.
2. **Create a Subscription**: Register your interest in specific events (channels) and define filters to receive only relevant updates.

## Documentation Overview

We have detailed guides to help you integrate with the Notifications system:

* **[Usage Guide](./nrc-subscriptions-use)**: Learn how to create subscriptions and filter messages for specific channels like Zaken or Documenten.
* **[Data Models](./nrc-db-subscriptions)**: Understand the underlying database structure for subscriptions if you need deep insight into how channels and filters are stored.
* **[Retries & Reliability](./nrc-retry-architecture)**: Information on how the system ensures delivery, including retry policies (Polly, Hangfire) and circuit breakers.

## Key Concepts

* **Kanaal (Channel)**: Represents a stream of messages, usually tied to a specific resource type (e.g., 'zaken', 'documenten').
* **Abonnement (Subscription)**: The registration that links a receiving application (via a callback URL) to a channel and set of filters.
* **Notificatie**: The actual message payload describing the event.

## Official Standards (VNG)

The OneGround Notifications system is implemented according to the standards defined by VNG Realisatie. While this documentation covers the specific implementation and usage within OneGround, the official standards provide the complete specification:

* **[VNG Notificaties Standard](https://vng-realisatie.github.io/gemma-zaken/standaard/notificaties/)**  
    The core specification for the Notifications API (Notificaties services). It defines the resources, behavior, and architecture of the notification system.

* **[VNG Notificaties Consumer Guide](https://vng-realisatie.github.io/gemma-zaken/standaard/notificaties-consumer/)**  
    A guide specifically for "consumers" — applications that subscribe to and receive notifications. This resource provides sequence diagrams and rules for handling notifications correctly.

For further technical details, please refer to the specific pages in this section.
