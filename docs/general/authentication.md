---
title: "Authentication"
sidebar_label: "Authentication"
description: "Learn how to obtain or generate JWT bearer tokens using ClientIDs for OneGround APIs in both Community and Unlimited editions."
keywords: ["ClientID", "JWT", "OneGround", "API", "Authentication", "ZGW"]
---

# Authentication

## Overview

Client applications require a JWT bearer token to authenticate themselves when calling an API on OneGround. The ZGW standard itself does not define a specific function or endpoint for retrieving such a token, so the method depends on the OneGround edition you are using.

## Token Retrieval in OneGround Community Edition

In the OneGround Community edition (Open Source), tokens are issued by Keycloak using OAuth2. Please refer to the **Getting Started** documentation for detailed instructions on setting up and retrieving tokens from Keycloak.

## Token Retrieval in OneGround Unlimited

For consumers of OneGround Unlimited, there is a dedicated endpoint available to return a token:

| Method | Endpoint                            |
| :----- | :---------------------------------- |
| `POST` | `https://<oneground-idp-url>/token` |

The request body must be sent as `multipart/form-data` and contain the following fields:

- `client_id`: `<CLIENT_ID>`
- `client_secret`: `<CLIENT_SECRET>`
- `grant_type`: `client_credentials`

Additionally, you can discover configuration details via the well-known endpoint:

```text
https://<oneground-idp-url>/.well-known/openid-configuration
```

## Self-Generated Tokens

To maintain compatibility with various ZGW-API consumers, OneGround also accepts self-generated tokens. Below is an example code snippet demonstrating how to generate such a token (based on a Postman script):

```javascript
function base64url(source) {
    // Encode in classical base64
    var encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, "");

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");

    return encodedSource;
}

function addIAT(data) {
    var iat = Math.floor(Date.now() / 1000); // Current time in seconds
    // You might add a small offset (e.g. + 257) if clock skew is an issue,
    // but standard claims usually start at current time.

    data.iat = iat;
    data.nbp = iat;
    data.exp = iat + 3600; // Expires in 1 hour
    return data;
}

// 1. Define Header
var header = {
    typ: "JWT",
    alg: "HS256"
};

// 2. Define Payload (Data)
var data = {
    client_id: "client-12345",
    rsin: "000000000",
    jti: "49f1ddb1-3b4b-4a44-9739-013728b9a826", // Unique ID for this token
    sub: "client-12345",
    aud: "ZGW_APIs",
    iss: "<some value>"
};

// Add Issued At, Not Before, and Expiration times
data = addIAT(data);

var secret = "<secret>";

// 3. Encode Header
var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
var encodedHeader = base64url(stringifiedHeader);

// 4. Encode Payload
var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
var encodedData = base64url(stringifiedData);

// 5. Build Token Signature
var tokenContent = encodedHeader + "." + encodedData;

var signature = CryptoJS.HmacSHA256(tokenContent, secret);
signature = base64url(signature);

// 6. Concatenate to form the final JWT
var signedToken = tokenContent + "." + signature;

console.log("Generated Token:", signedToken);
```
