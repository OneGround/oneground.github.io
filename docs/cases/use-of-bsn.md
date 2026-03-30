---
title: "Retrieving Cases for a Particular BSN"
description: "Best practices for securely retrieving cases by BSN, avoiding URL-based exposure of sensitive personal data."
keywords: [BSN, cases, ZRC, privacy, security, POST, zoek, GDPR, AVG, OneGround]
slug: /cases/use-of-bsn
---

# Retrieving Cases for a Particular BSN

Retrieving cases using a BSN (Dutch Social Security Number) can be done in two ways. While our case registration software supports both methods, many client applications are using the older, insecure method. This article explains the problem and the recommended solution.

### The Problem: Leaking BSNs via GET Requests

The current, widely-used method for fetching cases by BSN is a `GET` request where the BSN is passed as a URL parameter:

```plain
https://zaken.preprod-rx-services.nl/api/v1/zaken?rol__betrokkeneIdentificatie__natuurlijkPersoon__inpBsn=123443210
```

**This is a security and privacy risk.**

The BSN is sensitive, personal data. Placing it in a URL has serious consequences:

- **Extensive Logging**: Web servers, proxies, load balancers, and other network infrastructure log URLs by default. This means the BSN is stored in numerous log files across different systems.
- **Increased Exposure**: These logs are often retained for long periods and accessed for monitoring, debugging, or analytics, exposing the BSN to a wider audience than necessary.
- **Privacy Violation**: Unnecessarily logging sensitive data violates fundamental privacy principles (like GDPR/AVG) and creates a data leak that is difficult to contain or audit.

### The Solution: Use POST `/_zoek`

A safer and more robust alternative is to use the `POST /_zoek` endpoint from the VNG Zaken API. This method allows you to send the search parameters in the request body instead of the URL.

Since request bodies are generally not logged by servers and proxies, the BSN remains secure and is not exposed in log files.

Here is an example of how to use the `/_zoek` endpoint. Many other attributes are also possible.

**Request:**

```json
POST /api/v1/zaken/_zoek
Host: zaken.preprod-rx-services.nl
Content-Type: application/json

{
    "rol__betrokkeneIdentificatie__natuurlijkPersoon__inpBsn": "123443210",
    "expand": "rollen"
}
```

We strongly urge developers of client applications to update their implementation to use the `POST /_zoek` method to ensure the privacy and security of citizen data.
