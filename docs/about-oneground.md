---
title: "About OneGround"
description: "Overview of OneGround, a case-oriented API implementation by Roxit, covering its attended and unattended versions, key characteristics, and compliance with ZGW standards."
keywords: ["OneGround", "Roxit", "ZGW", "API", "Case Oriented", "VNG", "SaaS", "Open Source", "ISO-16175"]
---

# About OneGround

## What is OneGround

OneGround is the implementation by Roxit of "case oriented" Api's and registrations according to the [VNG specifications](https://vng-realisatie.github.io/gemma-zaken/standaard/).
It contains ZTC, ZRC, DRC, BRC, NC, AC and reference lists.

OneGround comes in two ways: attended and unattended. The attended version is full Saas and is hosted and maintained by Roxit. Apply [here](https://portaal.oneground.nl/register) for a trial account on the Saas version.

The unattended variant is available as [Open Source](https://github.com/OneGround/ZGW-APIs).

## Characteristics of OneGround Unlimited (attended)

- Fast onboarding
- High performance
- No limit on document size
- Support of the latest ZGW Api versions
- Follows the standard as closely as possible
- Fullfills NEN-ISO 16175
- Built to comply only to the ZGW standards
- Proven in production.

## Why are we saying this?

### Fast onboarding

In order to use OneGround you only have to contact Roxit and request a login account for the configuration tool. In the configuration tool, you can configure ClientID's and secrets, authorise them and immediately apply them to a Client application such as Open Forms. Thereafter you can start working with documents and cases in OneGround, and share them with your other applications that run on OneGround. The only prerequisite for using OneGround is an RSIN: the KvK (chamber of commerce) identification of your organisation. Your integration with OneGround can be up and running just a few minutes after receiving your login account.

### High performance

99% of ZGW Api requests are handled by OneGround within 50 milliseconds. Most calls that do take longer are related to uploading or downloading documents or expand requests that return large data sets. OneGround runs on Docker, except for document storage which is on the Ceph file system. this set up ensures that extra nodes can be added easily when needed. The system is monitored continuously and performance degradations are noticed fast so that they can be solved timely. The performance of OneGround will contribute to a good user experience of your Client Application.

### No limit on document size

By applying the DRC 1.1 notion of <em>file parts</em> (bestandsdelen), documents of any size can be stored and retrieved. You don;t need to set limits on file size in your client application.

### Support of the latest ZGW Api versions

We are currently in the process of finishing support for the currently (july 2024) latest versions of ZGW. That means that you can run all ZGW-compliant client applications on OneGround.

### Follows the standard as closely as possible

We intend to follow the standard as closely as possible. Only when it is not possible, for example because the requirements of the standard are contradictory, we deviate from the standard.
In all those instances we file an issues on the VNG Github repository with a request to clarify or a suggestion to fix the problem. Conformity to the standards means that you won't have long integration trajects if you run a ZGW compliant client application on OneGround.

### Fullfills NEN-ISO 16175

OneGround and Archive Management (Archiefbeheer) have been assesed according to ISO-16175:2020, part 1. The assessment was succesful and a declaration of conformity was provided. The base for conformity is provided by the ZGW business rules in ZRC and ZTC. They ensure that each completed case gets a relevant result type with proper indication for the period of retention. The values for result types and retention periods are provided by the Reference list component of OneGround, that we have loaded with the municipial and provincial selection lists. Compliancy to NEN-ISO 16175 means that you don't need an Open Source DMS like Alfresco or a proprietary DMS by a software vendor.

### Built to comply only to the ZGW standards

We started building all components of OneGround with the VNG ZGW standard as a blueprint. The only way to access the data in OneGround therefore is via ZGW conformant Api's. Thus, there is no other way to stoire a case or doucment than via these Api's. This ensures that the data in OneGround always conforms to the standard. Also it helps to provide optimal performance, because there are no older Api's or components to deal with and that might hamper performance. Because of this, you can be sure that all data retrieved from OneGround by a ZGW-compliant client application is readable.

### Proven in production

The VTH application Rx.Mission uses OneGround in production for 130 organisations (july 2024). At peak hours, thousands of users are indirectly using OneGround to read and store case information, to preview documents, and much more. This can lead to about a million Api calls in peak hours. We have many teams working together to keep this system running smoothly. Up to now nine other applications other than Rx.Mission are using OneGround, which number is increasing. This means for you that you can go live fast on OneGround, and expect few problems in production.
