---
title: "Example Document Upload"
description: "Step-by-step guide and Postman example for uploading documents in parts (bestandsdelen) to the DRC API in OneGround."
keywords: ["Document Upload", "DRC", "ZGW", "OneGround", "File Parts", "Bestandsdelen", "Postman", "API"]
---

<div class="text--center" style={{margin: '2rem 0'}}>
  <a href="/files/examplepm.json" class="button button--primary button--lg" download>
    Download Postman Project
  </a>
</div>

Please pay attention to the following points when using the example project:

- The JWT should be generated using a Client ID and secret. In OneGround, the token is best obtained [via IDP](../general/authentication.md), but it can also be self-generated.
- The `bronorganisatie` field in the body of step 1 must contain the RSIN of the organization that owns the DRC (i.e., the customer's RSIN).
- The `inhoud` field in the body of step 1 should be `null`.
- The `bestandsomvang` field in the body of step 1 must match the size in bytes of your sample file used in step 2.
- The response to step 1 contains a `lock` and the URL to the `bestandsdelen` endpoint.
