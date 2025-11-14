---
slug: oauth2-token-endpoint
title: "Why OneGround Uses an OAuth2 Token Endpoint"
description: "Learn why customer-generated JWTs are risky and how OAuth2 Token Endpoints provide better security, control, and simplicity for API authentication."
authors: giedriusgrabauskas
tags: [security]
keywords:
    - JWT security
    - OAuth2
    - Token Endpoint
    - API authentication
    - JSON Web Tokens
    - ZGW API security
    - OneGround authentication
    - token validation
    - API security best practices
    - bearer tokens
    - security implementation
---

We have previously published an [article on JWT best practices](./2024-12-03-best-practices-for-jwt-usage-in-apis.md), which outlines the standards for creating secure and reliable JSON Web Tokens. It covers essential practices like using proper claims (`iss`, `exp`), managing secrets securely, and keeping tokens short-lived.

This raises an important question: **Who is responsible for implementing these security rules?**

In some API designs, customers are asked to generate their own JWTs. The approach is seemingly straightforward: "Here is a secret key. Please create a JWT according to our guidelines, sign it, and include it in your `Authorization` header."

However, this model shifts the complex and critical responsibility of security onto you, the customer. At OneGround, we believe that security should be a shared responsibility, but the burden of token creation should lie with the API provider. This is why we use a standard **OAuth2 Token Endpoint**, which allows you to request a token from us instead of creating one yourself.

This article explains why our approach is more secure, reliable, and ultimately simpler for you.

<!-- truncate -->

## The Problem with "Bring Your Own JWT"

When an API provider asks you to create your own JWT, you become the token issuer (`iss`). This means you are responsible for managing the entire token generation process securely. While this might seem to offer flexibility, it introduces significant risks and complexities, not because of any oversight on your part, but because token generation is a sensitive security function.

Here are some of the challenges with this model:

- **Lack of Enforced Token Expiration:**
  A critical security practice is to use short-lived tokens. If you were to generate your own tokens, you would be responsible for managing their expiration. While our guidelines might suggest a one-hour expiration, it would be technically possible to create tokens with very long lifetimes, for example, to work around re-authentication logic. Such long-lived tokens would expose your application and our API to security risks, such as replay attacks, if a token is ever compromised. To prevent this, we would need to add complex validation checks on our side, which is a reactive security measure, not a proactive one.

- **It Creates Secret Management Burdens:**
  To enable you to sign JWTs, we would have to share a signing secret with you. This would place the burden of protecting that secret entirely on you. If the secret were accidentally leaked—for instance, by being committed to a code repository, embedded in a client-side application, or logged in plain text—an attacker could create valid tokens indefinitely. This would pose a significant security threat to your integration and data.

- **You Have No Control Over the Implementation:**
  To generate JWTs, your developers would need to select and use a library for the language of their choice. This introduces the risk of using outdated or insecure libraries that may contain vulnerabilities. For example, some older JWT libraries were susceptible to the `alg: "none"` vulnerability, where they would accept a token without a signature. This would allow an attacker to forge tokens and bypass security checks entirely.

- **It Increases API Complexity:**
  In a "bring your own JWT" model, our API would need to perform extensive validation on every single request to check for inconsistencies in how different customers implement their token generation. We would have to defensively validate every claim (`iss`, `aud`, `exp`) to ensure they are correctly implemented, adding overhead and complexity.

## The Secure and Simple Alternative: The OAuth2 Token Endpoint

The OAuth2 framework, specifically the **Client Credentials Grant** flow, provides a standardized and much more secure solution that we use at OneGround.

Here’s how it works:

1. **Request:** Your application sends a secure HTTPS `POST` request to our token endpoint (e.g., `/oauth/token`).
2. **Credentials:** In this request, you include the `client_id` and `client_secret` that we provide to you.
3. **Validation:** Our server validates these credentials against our secure credential store.
4. **Issuance:** If the credentials are valid, our server generates a new JWT with all the correct claims (`iss`, `aud`, `exp`, etc.).
5. **Signing:** Our server signs the JWT using a secure, asymmetric algorithm (like `RS256`) with our private key. This key never leaves our server, which is a major security advantage over sharing a secret with you.
6. **Response:** The signed JWT is returned to your application as an access token.
7. **Usage:** Your application includes this short-lived JWT in the `Authorization` header of your API requests. When it expires, you simply request a new one.

## OAuth2 Token Endpoint Practical Example

Here’s what a token request and its usage look like in practice:

**Request:**

```http
POST /token HTTP/1.1
Host: idp.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=abc123xyz
&client_secret=very-secure-secret-here
```

**Response:**

```json
{
    "access_token": "eyJhbGciOi...",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

**Using the token:**

```http
GET /api/resources HTTP/1.1
Host: zgw-api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

With this model, you don't have to worry about the internal structure of the JWT, signing algorithms, or claim management. You simply exchange your credentials for a ready-to-use token.

## Why the Token Endpoint Model is Better for You

This model ensures that the responsibility for creating secure tokens remains with us, the API provider. As the issuer (`iss`), we have full control over the security of the token generation process.

- **We Maintain All Best Practices on Your Behalf**
    - **Token Lifetime:** We set and enforce how long tokens are valid. If we decide they should expire in 15 minutes for security reasons, that is enforced for everyone. You don't have to worry about it.
    - **Claims:** Because we create the token, we guarantee that all necessary claims (`iss`, `aud`, `exp`) are accurate, present, and standardized.
    - **Algorithm:** We choose and manage the signing algorithm, such as the industry-standard `RS256`. Your application only needs to use the token, not understand its cryptographic implementation.

- **Our Private Signing Key Stays Secret**
    - The `client_secret` we provide you is not a signing key; it functions more like a password for your application to authenticate itself when requesting a token. The risk of a leak is significantly lower:
        - An attacker with a leaked `client_secret` can only request tokens, not create them. We can detect and rate-limit this activity.
        - We can quickly revoke a compromised `client_id` or rotate your credentials without affecting the entire system's security.
        - This is far more secure than a leaked signing key, which would allow an attacker to forge valid tokens undetected.

- **It's Easier for Your Developers**
    - Your developers don't need to research JWT libraries, manage signing keys, or worry about getting security claims right. Their only task is to make a single, standard HTTP `POST` request. This is a common task that any developer can implement in any language without specialized security knowledge.

- **You Benefit from Better Security Controls**
    - **Rate Limiting:** We protect our token endpoint with rate limiting to prevent brute-force attacks on client credentials.
    - **Token Revocation:** If your credentials are ever compromised, we can revoke your `client_id` immediately, cutting off all future token requests from that ID.
    - **Scope-Based Access:** We can issue tokens with specific permissions (scopes) based on your client's needs, ensuring your application has only the access it requires (the principle of least privilege).
    - **Audit Trails:** We maintain logs of all token requests, allowing us to detect suspicious patterns and investigate potential unauthorized access attempts.
    - **Short-Lived Tokens:** We enforce short token lifetimes (e.g., 15-60 minutes) to minimize the risk if a token is ever intercepted.

## Conclusion

JSON Web Tokens are an excellent standard for securely transmitting information in APIs. However, the creation of these tokens is a sensitive security function that should be managed by the API provider, not the customer.

By using a standard OAuth2 Token Endpoint, we provide a more secure and reliable authentication system. We handle the complexities of token generation, allowing you to focus on building your application. This approach simplifies development, reduces security risks, and ensures that best practices are followed consistently.

When a token expires, your application simply requests a new one. For the Client Credentials flow, this is a straightforward process that does not require complex refresh token logic, keeping your integration simple while maintaining a high level of security.

## OneGround's Commitment to Secure Authentication

At OneGround, we are committed to providing the most secure and reliable API experience. That's why we have implemented an OAuth2 Token Endpoint across our platform and require all customers to generate tokens through this standardized and secure approach.

By centralizing token creation, we ensure consistent security practices for all our customers, eliminate common vulnerabilities associated with client-side token generation, and simplify the integration process for your development teams. You no longer need to worry about JWT creation, signing algorithms, or claim validation. Instead, you can confidently and easily request a token from our endpoint to access our APIs.

This approach reflects our dedication to security best practices and our responsibility as your API provider to handle authentication correctly. We believe this model benefits everyone: you get a simpler and more secure integration, and we maintain the high security standards that OneGround is known for.

You can read more about our implementation and how to use the OAuth2 Token Endpoint in our [ClientID Management and JWT Authentication in OneGround](../docs/usage-of-clientids.md) documentation.

## References

- [RFC 6749: The official specification for OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)
- [RFC 7519: JSON Web Token (JWT) specification](https://datatracker.ietf.org/doc/html/rfc7519)
- [RFC 8252: OAuth 2.0 for Native Apps - Best Current Practice](https://datatracker.ietf.org/doc/html/rfc8252)
- [RFC 6819: OAuth 2.0 Threat Model and Security Considerations](https://datatracker.ietf.org/doc/html/rfc6819)
- [BCP: OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
- [OWASP: OAuth 2.0 Protocol Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html)
- [OWASP: JSON Web Token Security Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [OWASP: WSTG Testing for OAuth Weaknesses](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/)
- [auth0.com: Critical vulnerabilities in JSON Web Token libraries](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/)
- [JWT.io: Introduction to JSON Web Tokens: A beginner-friendly guide to understanding JWTs](https://jwt.io/introduction)
- [oauth.com: OAuth 2.0 Simplified](https://www.oauth.com/)
- [oauth.com: Client Credentials, OAuth 2.0 Simplified](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
