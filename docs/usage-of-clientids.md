---
title: "ClientID Management and JWT Authentication in OneGround"
description: "Complete guide to ClientID creation, management, and JWT bearer token authentication for OneGround ZGW APIs. Learn how to obtain credentials, generate tokens, and configure secure API access."
keywords:
    - ClientID
    - JWT authentication
    - bearer token
    - OneGround authentication
    - ZGW API security
    - API credentials
    - client configuration
    - authentication guide
    - secret management
---

# ClientID's

## What you need to know

Client applications need a JWT bearer token to identify themselves when they are calling an API on OneGround. The ZGW standard does not define a function for retrieving such a token.

## How to get a token in Oneground Community edition

In OneGround Community edition (Open Source) the token is delivered by Keycloak using OAuth2. See the documentation of Getting-Started for more details.

## How to get a token in Oneground Unlimited

For consumers of OneGround unlimited there is an endpoint that returns a token:

```
    [POST] https://<oneground-idp-url>/token
```

The body (multipart/formdata) must contain:

```
    client_id: <CLIENT_ID>
    client_secret: <CLIENT_SECRET>
    grant_type: client_credentials
```

In addition there is a well-known endpoint:

```
    https://<oneground-idp-url>/.well-known/openid-configuration
```

## How to generate a token

In order to be compatible with many ZGW-API consumers, OneGround accepts self generated tokens. Here is an example code snippet for generating such a token (taken from Postman):

```js
function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, "");

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");

    return encodedSource;
}

function addIAT(request) {
    var iat = Math.floor(Date.now() / 1000) + 257;
    data.iat = iat;
    data.nbp = iat;
    data.exp = iat + 3600;
    return data;
}

var header = {
    typ: "JWT",
    alg: "HS256"
};

var data = {
    client_id: "client-12345",
    rsin: "000000000",
    jti: "49f1ddb1-3b4b-4a44-9739-013728b9a826",
    sub: "client-12345",
    aud: "ZGW_APIs",
    iss: "<some value>"
};
data = addIAT(data);

var secret = "<secret>";

// encode header
var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
var encodedHeader = base64url(stringifiedHeader);

// encode data
var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
var encodedData = base64url(stringifiedData);

// build token
var token = encodedHeader + "." + encodedData;

var signature = CryptoJS.HmacSHA256(token, secret);
signature = base64url(signature);

var signedToken = token + "." + signature;
```
