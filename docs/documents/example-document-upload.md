---
title: "Example Document Upload"
description: "Step-by-step guide and Postman example for uploading documents in parts (bestandsdelen) to the DRC API in OneGround."
keywords: ["Document Upload", "DRC", "ZGW", "OneGround", "File Parts", "Bestandsdelen", "Postman", "API"]
---

Attached is an example [Postman project](./examplepm.json) with a sequence for document upload in parts (bestandsdelen).

Please pay attention to the following:

- the JWT should be generated using a Client ID and secret
- the field bronorganisatie in the body of step 1 should contain the rsin of the organisation that owns the DRC (thus, the rsin of the customer)
- the field "inhoud" in the body of step 1 should be null
- the field "bestandsomvang" in the body of step 1 should match the number if bytes in your sample file in step 2
- the response to step 1 contains a lock, and the url to the bestandsdelen
