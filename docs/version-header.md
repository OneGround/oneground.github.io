---
title: "Usage of Version Headers"
description: "Guidelines and best practices for using the Api-version header in OneGround APIs, including compliance with the API Strategy standard."
keywords: ["Api-version", "Header", "OneGround", "ZGW", "API Strategy", "Versioning"]
---

# Usage of version headers in OneGround

Many applications built by Roxit and other vendors use the Api-version header. This might result in problems. The question is which version numbers may be used in the version header and when.

## What are the rules of the standard?

Rules for versioning and the header itself are [described in the Api Strategy](https://docs.geostandaarden.nl/api/vv-hr-API-Strategie-20190715/#versioning). This Api Strategy does not say if or when an Api-version header should be used. It does say that if a client uses the version header, it should be at most one version above or one version below the current version in (pre)production.

The role of version headers in transition between major versions is [described by VNG](https://vng-realisatie.github.io/gemma-zaken/themas/achtergronddocumentatie/versies-en-migraties) but this is not relevant for the present article.

## Example of versions (DRC)

Below a part of the list of published [DRC versions](https://vng-realisatie.github.io/gemma-zaken/standaard/documenten/)

| Version | Start date |
| ------- | ---------- |
| 1.5.0   | 14-03-2024 |
| 1.4.3   | 27-10-2023 |
| 1.4.2   | 26-09-2023 |
| 1.3.2   | 26-09-2023 |
| 1.2.5   | 26-09-2023 |
| 1.4.1   | 29-08-2023 |
| 1.3.1   | 29-08-2023 |
| 1.2.4   | 29-08-2023 |

According to the Api Strategy, since 1.5.0 is released, the Api-version header may contain 1.4.3 but not lower. Since some Client applications do have lower version numbers in it, our headers are not valid according to AS.

## Considerations

- The Api strategy should be leading in because ZGW-specs refer to this standard as leading;

- OneGround does not support most intermediate ZGW-versions, but that is not relevant because our client applications also should run on other ZGW-implementations that might have other versions supported;

- Not all ZGW implementations support all version numbers, it therefore is unwise to request specific versions in the Api-version header;

- Since newer minor versions are backwards compatible there normally is no reason to request specific versions in the header;
- Support of older versions might be dropped by OneGround and other ZGW implementations;

- In general, specifying a specific version of the API will not prevent issues because of the introduction of bugs. That will only be true, when the bug is in the new API version code. But most bugs occur in the shared code and will also be present in the requested version. There is more risk that the specific version requested is removed from the API, because of the introduction of newer versions. In that case specifying a specific version will causing breaking the integration itself.

## Recommendations

Only specify the Api-version header in API-calls to OneGround or other ZGW's in exceptional cases.

- Use a higher Api-version header then supported in (pre)production when testing a new version of the Api in OneGround with tools like Postman, Selenium, ..;

- Apply a higher Api-version header in specific methods of the Client Application when OneGround only supports that method of that version.
  For example, ZRC is on version 1.5.0 in production and some applications urgently needs a feature of 1.6.0 that is not yet implemented. OneGround then might serve temporarily only this specific method of 1.6.0, whereby the current version in production remains 1.5.0. The Client applications adds the Api-version header 1.6.0 only to this method and removes it after OneGround is on 1.6.
