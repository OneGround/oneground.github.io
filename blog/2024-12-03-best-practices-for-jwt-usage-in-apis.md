---
slug: best-practices-for-jwt-usage-in-apis
title: Best Practices for JWT Usage in APIs
authors: giedriusgrabauskas
tags: [security]
---

# Best Practices for JWT Usage in APIs

JSON Web Tokens (JWT) is an essential part of modern API ecosystems, providing a secure and efficient method for verifying user identities and exchanging information between parties. However, as with any security mechanism, improper implementation can introduce vulnerabilities.

<!-- truncate -->

## Core Concepts of JWT

A JWT is a compact, URL-safe token format that encodes information in three parts:

1. **Header:** Specifies the token type and signing algorithm.
2. **Payload:** Carries the claims, which include user-related data or other metadata.
3. **Signature:** Validates the token's integrity using a secret key or public/private key pair.

When used appropriately, JWTs enable stateless authentication, eliminating the need for the server to store session data. The token itself holds all essential authentication information and expires after a defined period.

## JWT Usage Recommendations for Your Applications

To maximize security, we recommend the following best practices:

### 1. Use Properly Configured Claims

JWT claims are key-value pairs encoded into the token's payload. While you can include custom claims based on your API's needs, several standard claims form the backbone of a well-constructed JWT:

- **iss (Issuer):** Identifies the entity that issued the JWT. Always explicitly set the `iss` claim to indicate the origin of the token. Both the API and consuming applications should agree on the expected `iss` value in advance, and the application generating the JWT should include its name or link in this claim. Tokens with missing or incorrect `iss` values may be rejected by the API for security purposes.

- **exp (Expiration Time):** Sets the token's expiration date and time using a Unix timestamp. This ensures the token cannot be used indefinitely, even if it is compromised.

- **aud (Audience):** Defines the intended audience for the token. By specifying the `aud` claim, an API can ensure that the token is meant for its use and not an unrelated service.

- **iat (Issued At):** The timestamp of when the token was created, which can help detect tokens created in the future by malicious actors.

### 2. Limit Token Lifetimes (`exp`)

Long-lived tokens pose a significant risk if they are leaked or intercepted. To protect sensitive resources, set an appropriate expiration time (`exp`) when creating tokens (from 5 minutes to a few hours) and avoid using long expiration times (e.g., months or years) for tokens, especially those used in production.

So, using short-lived tokens reduces the window for potential misuse when the token is compromised. Even if an unauthorized party gains access to a token, the inherent time restriction ensures its usability is limited.

### 3. Secure Your Secrets

When generating JWTs signed with symmetric algorithms, a secret key is used to sign and validate the token. If this secret is exposed, attackers can create their valid tokens. To prevent this:

- Store secrets securely and never expose them in source code or client-side applications.
- Rotate signing secrets periodically, at least each year, to minimize the impact of a potential breach.

### 4. Use Trusted Libraries

When implementing JWT functionality in your applications, selecting the correct library is crucial for ensuring security and reliability.

- Use well-established libraries that are actively maintained, widely used, and trusted for their security.
- Keep libraries up to date to address vulnerabilities and use dependency management tools to track outdated versions.
- Avoid building custom implementations for JWT tokens, as they can lead to security gaps and missed edge-case scenarios.

### 5. Assign Each Client ID to a Single Application (`client_id`)

Each JWT token should be associated with a unique client ID for improved security and accountability, which must be dedicated to only one application.

- **Traceability:** Enables effective tracking and auditing of each client’s actions.
- **Prevent Token Sharing:** Ensures tokens are not shared across multiple clients, minimizing the risk of unauthorized access.
- **Revocation:** Allows tokens issued to specific clients to be revoked without disrupting others.

## Final Thoughts

JWT tokens are a powerful tool for securing APIs, but their effectiveness depends on proper configuration and usage. By following the best practices - such as setting appropriate claims, and limiting token lifetime — you can build a robust and secure authentication system for your APIs.

For detailed guidance on implementing JWT in your specific environment, you can find recommendations in JWT libraries and tools for your programming language or framework. Always stay informed about the latest security updates to evolve your implementation as threats and technologies change.

## References

- [RFC 7519: The official specification for JSON Web Tokens](https://datatracker.ietf.org/doc/html/rfc7519)
- [Jwt.io - Introduction to JSON Web Tokens: A beginner-friendly guide to understanding JWTs](https://jwt.io/introduction)
- [OWASP - Testing JSON Web Tokens: Detailed security testing methodologies for JWTs](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/10-Testing_JSON_Web_Tokens)
- [OWASP - Attacking and Securing JWT: Insights into common JWT vulnerabilities and how to secure them](https://owasp.org/www-chapter-vancouver/assets/presentations/2020-01_Attacking_and_Securing_JWT.pdf)
- [OWASP - JWT SECURITY: Short introduction in JWT security](https://owasp.org/www-chapter-belgium/assets/2021/2021-02-18/JWT-Security.pdf)
