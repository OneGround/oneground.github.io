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

We already have published an [article on JWT best practices](./2024-12-03-best-practices-for-jwt-usage-in-apis.md) that explains the rules for creating safe and reliable JSON Web Tokens. It emphasizes using proper claims like `iss` (Issuer) and `exp` (Expiration), securely managing secrets, and keeping tokens short-lived.

But this raises a key question: **Who should be responsible for following these rules?**

A risky pattern in API design is letting customers create their own JWTs. The idea seems simple: "Here's a secret key, Mr. Customer. Just make a JWT using our guidelines, sign it with this secret, and include it in your `Authorization` header."

This approach shifts the difficult task of security onto the customer, which goes against best practices and can lead to an unstable and insecure system.

A much better model is to use a standard **OAuth2 Token Endpoint**. Instead of asking your customer to create a token, you let them request one.

<!-- truncate -->

## The Problems with "Bring Your Own JWT"

When you allow a customer to create their own JWT, you turn them into an Issuer (`iss`). This means you are relying on them to manage the entire token process safely and correctly. This is often risky, not due to any malicious intent from customers, but because generating tokens is a complex process.

This approach falls short of best practices in several ways:

* **You Can't Control Token Expiration:**
You can suggest a one-hour expiration, but you can't enforce it. A developer might try to "fix" re-authentication issues by setting the `exp` claim to 10 years. This exposes your API to replay attacks and unauthorized access from long-lived tokens. To fix this, you would need to add complex validation checks, which is a reactive security measure, not a proactive one.

* **It Creates Secret Management Issues:**
You have to share a signing secret with your customers, which makes their secret management your security risk. If they leak the secret, by committing it to code, embedding it in an app, or logging it, attackers could create valid tokens forever, impersonating legitimate clients without being detected.

* **You Have No Control Over Implementation:**
You can't ensure that customers are using trusted libraries. They might use outdated or insecure libraries or try to create their own JWTs in a way that isn't secure. This exposes you to attacks like the `alg: "none"` vulnerability, where some JWT libraries might accept unsigned tokens. This would allow attackers to create fake tokens by skipping the signature validation.

* **It Increases API Complexity:**
Your API has to handle validation for tokens from different customer setups, each with its own unique issues. You have to validate every claim (`iss`, `aud`, `exp`) in each request to make sure the customer has implemented it correctly.

## The Secure and Simple Alternative: The OAuth2 Token Endpoint

The OAuth2 framework, particularly the **Client Credentials Grant** flow, offers a simple and standardized solution.

Here's how it works:

1. **Request:** The customer (client) sends a secure HTTPS `POST` request to your token endpoint (e.g., `/oauth/token`).
2. **Credentials:** In this request, they include the `client_id` and `client_secret` that you provided.
3. **Validate:** Your server validates these credentials against your secure credential store.
4. **Issue:** If the credentials are valid, your server generates a new JWT with the appropriate claims (`iss`, `aud`, `exp`, etc.).
5. **Sign:** Your server signs the JWT using asymmetric cryptography (e.g., `RS256` with your private key). This is better than symmetric signing because your private key never leaves your server. In contrast, symmetric methods like `HS256` would still require you to share a secret.
6. **Respond:** The signed JWT is returned to the customer as an access token.
7. **Use:** The customer includes this short-lived JWT in their API requests. When it expires, they simply request a new one.

## OAuth2 Token Endpoint Practical Example

Here's what a token request looks like in practice:

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

The customer doesn't have to worry about the JWT structure, signing algorithms, or claim management. They simply exchange their credentials for a token and use it.

## So, why is the Token Endpoint Model Better?

This model ensures that the responsibility for creating tokens stays with you, the API provider. You are the Issuer (`iss`), and you have full control over the process.

* **You Maintain All Best Practices**
  * **Token Lifetime:** You set how long tokens last. If you decide they should expire in 15 minutes, that's what happens. The customer can't change it.
  * **Claims:** Since you create the token, you can ensure that all claims (`iss`, `aud`, `exp`) are accurate, included, and standardized.
  * **Algorithm:** You choose the signing method, such as `RS256`. Customers only need to use the token; they don't need to know how it's signed.

* **Your Private Key Stays Secret**
  * The customer's `client_secret` is not a signing key; it's more like a password used to request a token. If it gets leaked, the risk is much smaller:
    * An attacker can request tokens but can't create them. You can detect and rate-limit this activity.
    * You can revoke that `client_id` or rotate the credentials.
    * This is much safer than a leaked signing key, which could let an attacker create fake tokens without being noticed.

* **It's Easier for Your Customer**
  * Customers don't need to set up JWT libraries, handle signing keys, or manage claims. Their job is simply to make one HTTP `POST` request. Any developer can do this in any language without needing specialized tools.

* **You Get Better Security Controls**
  * **Rate Limiting:** You can protect the token endpoint with rate limiting to prevent brute-force attacks on client credentials.
  * **Token Revocation:** If credentials are compromised, you can revoke the `client_id` immediately to invalidate all future token requests.
  * **Scope-Based Access:** You can issue tokens with specific scopes or permissions based on the client, which allows for fine-grained access control.
  * **Audit Trail:** You can log all token requests to detect suspicious patterns or unauthorized access attempts.
  * **Short-Lived Tokens:** You can enforce brief token lifetimes (15-60 minutes) to minimize the window of opportunity if a token is intercepted.

## Conclusion

JSON Web Tokens are excellent for securely transmitting information. However, creating them is a delicate security task that should not be left to customers.

By using a standard OAuth2 Token Endpoint, you can manage your API's security more effectively. You can apply all best practices, keep your important secrets secure, and offer a simpler, stronger, and more professional experience for your developers.

When tokens expire, customers can simply request a new one. No complex refresh logic is needed for the Client Credentials flow, which keeps the integration straightforward while maintaining strong security.

## OneGround's Token Endpoint Implementation

At OneGround, we are committed to providing the most secure and reliable API experience. That's why we are implementing OAuth2 Token Endpoints across our platform and will soon require all customers to generate tokens through this standardized approach.

By centralizing token creation under our control, we can ensure consistent security practices, eliminate common vulnerabilities, and simplify the integration process for our customers. This means you'll no longer need to manage JWT creation, signing algorithms, or claim validation. You can simply request a token from our endpoint and use it to access our APIs.

This change reflects our dedication to security best practices and our responsibility as your API provider to handle authentication correctly. We believe this approach benefits everyone: you get a simpler integration process, and we maintain the high security standards that OneGround is known for.

You can read more about our implementation and how to use the OAuth2 Token Endpoint in our [ClientID Management and JWT Authentication in OneGround](../docs/usage-of-clientids.md) documentation.

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
