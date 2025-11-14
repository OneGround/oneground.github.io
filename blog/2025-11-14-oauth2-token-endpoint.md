---
slug: oauth2-token-endpoint
title: "OAuth 2.0 Token Endpoint - OneGround Security Guide"
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

# OAuth2 Token Endpoint

We already have published an [article on JWT best practices](./2024-12-03-best-practices-for-jwt-usage-in-apis.md) that clearly explains the rules for creating safe and reliable JSON Web Tokens. It emphasizes the importance of proper claims like `iss` (Issuer) and `exp` (Expiration), securely managing secrets, and using tokens that do not last long.

But it raises a key question: **Who should be in charge of following these rules?**

A risky pattern in API design is letting customers create their own JWTs. The idea seems simple: "Here's a secret key, Mr. Customer. Just make a JWT using our guidelines, sign it with this secret, and include it in your Authorization header."

This method goes against best practices by making customers take on the difficult task of security. This leads to an unstable and unsafe system.

A much better model is to use a standard **OAuth2 Token Endpoint**. Instead of asking your customer to create a token, you let them request one.

<!-- truncate -->

## The Problems with "Bring Your Own JWT"

When you will allow a customer to create their own JWT, you turn them into an Issuer (`iss`). This means you are relying on them to manage the entire token process safely and correctly. This is often risky, not due to any malicious intent from customers, but because generating tokens is a complex process.

This approach fails, based on best practices:

* **Cannot Control Token Expiration:**
You can suggest a 1-hour expiration, but you cannot enforce it. A developer might "fix" re-authentication issues by setting `exp` to 10 years. This exposes your API to replay attacks and unauthorized access from long-lived tokens. To address this, you would need complex validation checks, which is reactive rather than proactive security.

* **Secret Management Issues:**
You have to share a signing secret with customers, turning their secret management into your security risk. If they leak the secret by committing it to code, embedding it in apps, or logging it, attackers could forge valid tokens indefinitely, impersonating legitimate clients without detection.

* **Lack of Control Over Implementation:**
You cannot ensure that customers use trusted libraries. They might use outdated or insecure libraries, or attempt to create their own JWTs in insecure ways. This exposes you to attacks such as the `alg: "none"` vulnerability, where vulnerable JWT libraries may accept unsigned tokens, allowing attackers to forge tokens by skipping signature validation entirely.

* **API Complexity:**
Your API must handle validation for tokens from various customer setups, each with its unique quirks. You must validate every claim (`iss`, `aud`, `exp`) in each request to ensure the customer has implemented it correctly.

## The Secure & Simple Alternative: The OAuth2 Token Endpoint

The OAuth2 framework, especially with the **Client Credentials Grant** flow, can offer an easy and standard solution.

How it works:

1. **Request:** The customer (client) sends a secure HTTPS POST request to your token endpoint (e.g., `/oauth/token`).
2. **Credentials:** In this request, they include their `client_id` and `client_secret` that you provided.
3. **Validate:** Your server validates these credentials against your secure credential store.
4. **Issue:** If valid, your server generates a new JWT with appropriate claims (`iss`, `aud`, `exp`, etc.).
5. **Sign:** Your server signs the JWT using asymmetric cryptography (e.g., RS256 with your private key). This is preferred over symmetric signing because your private key never leaves your server, while symmetric methods like HS256 would still require sharing a secret.
6. **Respond:** The signed JWT is returned to the customer as an access token.
7. **Use:** The customer includes this short-lived JWT in API requests. When it expires, they simply request a new one.

## OAuth2 Token Endpoint Practical Example

Here's what a token request looks like in practice:

**Request:**

```http
POST /token HTTP/1.1
Host: api.example.com
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

The customer doesn't worry about JWT structure, signing algorithms, or claim management. They simply exchange credentials for a token and use it.

## So, why the Token Endpoint Model is Better?

This model makes sure that the responsibility for creating tokens stays with you, the API provider. You are the Issuer (`iss`), and you have full control over the process.

* **You Maintain All Best Practices**
  * **Token Lifetime:** You set how long tokens last. If you decide they expire in 15 minutes, that's what happens. The customer cannot change it.
  * **Claims:** Since you create the token, you ensure all claims (`iss`, `aud`, `exp`) are accurate, included, and standardized.
  * **Algorithm:** You pick the signing method, such as `RS256`. Customers only need to use the token without knowing how it is signed.

* **Your Private Key Stays Secret**
  * The customer's `client_secret` is not a signing key. It's like a password used to request a token. If it gets leaked, the risk is smaller:
    * An attacker can request tokens but cannot create them. You can detect and rate-limit this activity.
    * You can revoke that `client_id` or rotate credentials.
    * This is much safer than a leaked signing key, which could let an attacker create fake tokens without being noticed.

* **Easier for Your Customer**
  * Customers don't need to set up JWT libraries, handle signing keys, or manage claims. Their job is simply to make one HTTP POST request. Any developer can do this in any language without specialized tools.

* **Better Security Controls**
  * **Rate Limiting:** Protect the token endpoint with rate limiting to prevent brute-force attacks on client credentials.
  * **Token Revocation:** When credentials are compromised, revoke the `client_id` immediately to invalidate all future token requests.
  * **Scope-Based Access:** Issue tokens with specific scopes or permissions based on the client, enabling fine-grained access control.
  * **Audit Trail:** Log all token requests to detect suspicious patterns or unauthorized access attempts.
  * **Short-Lived Tokens:** Enforce brief token lifetimes (15-60 minutes) to minimize the window of opportunity if a token is intercepted.

## Conclusion

JSON Web Tokens are excellent for securely transmitting information. However, creating them is a delicate security task that should not be left to customers.

By using a standard OAuth2 Token Endpoint, you manage your API's security more effectively. You can immediately apply all best practices, keep your important secrets secure, and offer a simpler, stronger, and more professional experience for your developers.

When tokens expire, customers simply request a new one, no complex refresh logic needed for the Client Credentials flow. This keeps integration straightforward while maintaining strong security.

So, please stop making your customers handle security. Centralize token creation will be kept under your control.

## References

* [RFC 6749: The official specification for OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)
* [RFC 7519: JSON Web Token (JWT) specification](https://datatracker.ietf.org/doc/html/rfc7519)
* [RFC 8252: OAuth 2.0 for Native Apps - Best Current Practice](https://datatracker.ietf.org/doc/html/rfc8252)
* [RFC 6819: OAuth 2.0 Threat Model and Security Considerations](https://datatracker.ietf.org/doc/html/rfc6819)
* [BCP: OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
* [OWASP: OAuth 2.0 Protocol Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html)
* [OWASP: JSON Web Token Security Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
* [OWASP: WSTG Testing for OAuth Weaknesses](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/)
* [auth0.com: Critical vulnerabilities in JSON Web Token libraries](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/)
* [JWT.io: Introduction to JSON Web Tokens: A beginner-friendly guide to understanding JWTs](https://jwt.io/introduction)
* [oauth.com: OAuth 2.0 Simplified](https://www.oauth.com/)
* [oauth.com: Client Credentials, OAuth 2.0 Simplified](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
