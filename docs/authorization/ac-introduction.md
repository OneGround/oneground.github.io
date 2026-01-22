---
title: "Introduction to Authorizations"
description: "Overview of the ZGW Authorizations (AC) system, managing application permissions and access control."
keywords: [authorizations, introduction, AC, access control, ZGW, API, OneGround, permissions, ClientID]
slug: /authorization/introduction
---

# Introduction to Authorizations

The Authorizations system (often referred to as **AC** or Authorizations Component) is a fundamental part of the ZGW API landscape provided by OneGround. It manages the permissions for client applications, ensuring that they can only access or modify the data they are authorized for within the ZGW APIs (such as Zaken or Documenten).

## How it works

The AC acts as the central authority for checking permissions when an API request is made.

1. **API Call**: A client application makes a request to a ZGW API (e.g., creating a Case), including a **Bearer Token**.
2. **Identification**: The API validates the token and extracts the **Client ID**.
3. **Verification**: The API consults the **AC** to verify if the application associated with that Client ID has the necessary authorizations for the requested operation.
4. **Access**: If a valid authorization exists, the request is processed; otherwise, it is denied.

## Getting Started

To manage access for your applications, you typically use the OneGround configuration tool. The process involves:

1. **Create an Application**: Define a logical application entity in the system.
2. **Assign Client ID**: Link a unique Client ID (from your identity provider) to the application.
3. **Configure Authorizations**: detailed permissions are assigned to the application. OneGround provides "Authorization profiles" to help select meaningful sets of permissions.

> **Best Practice**: We advise using only **one Client ID per Application**. This creates a clear 1-to-1 relationship, making it easier to adjust authorizations for specific consumers without affecting others.

## Key Concepts

- **Applicatie (Application)**: A registry of a consumer system. In the ZGW standard, an application can have multiple Client IDs, but OneGround tooling enforces a simplified model.
- **Client ID**: The unique identifier found in the authentication token (JWT) that identifies the calling software.
- **Autorisatie (Authorization)**: A specific rule granting permission to perform certain actions (scopes) on certain resources.

## Limitations and Advice

When using the OneGround configuration tool, keep the following in mind:

- **One Client ID per App**: While the standard allows multiple, the tool restricts this to simplify configuration and clarity.
- **Granularity**: The tool is designed to prevent "Authorization Hell". While the API technically supports very granular authorizations (e.g., specific case types), the tool focuses on robust, workable profiles to avoid issues where applications lose access to relevant data (e.g., versioning conflicts with case types).
- **Least Privilege**: Always restrict authorizations as much as possible. Giving an application "all Authorizations" might inadvertently grant permission to delete all cases.

## Official Standards (VNG)

The OneGround Authorizations system is implemented according to the standards defined by VNG Realisatie. The official standards provide the complete specification:

- **[VNG Autorisaties Standard](https://vng-realisatie.github.io/gemma-zaken/standaard/autorisaties/)**  
   The core specification for the Authorizations API (Autorisaties services). It defines how applications and authorizations should be structured and queried.

For further technical details on how to configure authorizations in OneGround, please refer to the specific configuration guides.
