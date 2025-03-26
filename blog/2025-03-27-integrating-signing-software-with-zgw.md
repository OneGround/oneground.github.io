---
slug: integrating-signing-software-with-zgw
title: A standardized way to initiate signing of documents in the ZGW landscape
authors: michielnijdam
tags: [integrations]
---

## Introduction

Digitally signing documents is a common task in the workflow of handling a case. Several software vendors offer solutions for this. This article describes a standardized pattern to handle the signing of documents within the ZGW API landscape. Most API-calls in this pattern are already part of the ZGW standard. The missing link was a way to initiate the signing transaction. In this article we propose a standardized trigger message for this purpose.

<!-- truncate -->

## Signing sequence
The basic flow for signing documents is as follows:

- A user working on a case in a task specific application (TSA) or case management system (ZAC) selects one or more documents related to the case to be signed by one or more signers
- The TSA or ZAC sends a trigger message to the signing software
- The signing software retrieves the documents from the DRC and presents them to the signers
- When all signers have signed the documents, the signing software uploads the signed versions of the documents to the DRC. Depending on the vendor and configuration of the signing software, it might also add a separate evidence document with proof of signing to the case.
- The signing software sends a notification to the NRC to indicate signing is complete
- The TSA or ZAC handles this notification, for instance by informing the user

Below is a sequence diagram with a more detailed view of this flow.
[![Sequence diagram](/img/signing-sequence.png)](/img/signing-sequence.png)
[Use this link to view the diagram in full size.](/img/signing-sequence.png)


## ZGW Compliance

Most API requests in this sequence are standard requests already defined in the ZGW specification, with the following two remarks:

- The ZGW standard does not provide in a way to initiate a signing transaction. This article proposes a standardized format for this trigger message. This is the only non-ZGW request in this sequence.
- The notification to the NRC at the end of the signing flow is a standard request following the NRC specification. The channel used is a custom channel "documentacties". This channel needs to be registered in the NRC for the signing flow to work. This is a one-tima action that should be done by the administrator of the ZGW implementation. Registering a new channel is a standard request within the NRC specification, so all compliant ZGW implementations should support adding this channel. This same channel might be used for other events concerning documents in the future.

## Scope of this article

This article describes the interaction between the APIs of the TSA or ZAC, the signing software and the ZGW components (DRC, ZRC and NRC). The user interaction for selecting the documents and signers is out of scope, this is the responsibility of the TSA or ZAC. The same goes for the user interaction of the actual signing of the documents, that is the responsibility of the signing software.

## Existing implementations

The pattern described here is already implemented and used in production settings by the signing applications [ValidSign](https://www.validsign.eu/) and [Zynyo](https://zynyo.com/) and by the TSA [Rx.Mission](https://rxmission.nl/). These existing implementations use OneGround as the ZGW implementation, but as this pattern only uses standard behaviour of the ZGW components, it should work on any compliant ZGW implementation.

## Technical details

### Authentication

#### Authentication on the ZGW requests

The requests to the ZGW components use the standard authentication for the ZGW API: a JWT generated based on a ClientId and secret. See the [OneGround documentation](/docs/usage-of-clientids) or the general [ZGW documentation](https://vng-realisatie.github.io/gemma-zaken/themas/achtergronddocumentatie/authenticatie-autorisatie) for details.

#### Authentication on the trigger message

The type of authentication on the trigger message is determined by the signing software and might vary between vendors. Acceptable authentication methods include usage of an api-key or a bearer token based on a ClientId and Secret. Note that in the case of ClientId and Secret, this will be a separate ClientId from the one used to access the ZGW API. The TSA or ZAC sending the trigger message should implement the authentication method for the signing software vendor(s) it integrates with.

#### Authentication of the signer

Before the documents are presented to the signer, this person should authenticate themselves. Handling this authentication is the responsibility of the signing software, however the required type of authentication can be set in the trigger message send by the TSA or ZAC. See the details of the trigger message for more on this.

### Trigger message

To initiate the signing process, the TSA or ZAC should post a trigger message to the signing software in this format:

```
{
    "naam": "...", // Name of signing transaction, can be displayed to the signer(s) by the signing software
    "eigenaar": "lisa@breda.dev", // e-mail of user that initiates the signing transaction
    "zaak": {
        "uuid": "2cc803a9-7404-4289-8f3d-f2300f666eac", // uuid of the case
        "url": "$url"   // ZRC url of the case
    },
    "bewijs_informatieobjecttype": "$url", // informationobjecttype for evidence document
    "documenten": [ // list of documents to sign
        {
            "uuid": "f491249e-0651-4d22-a8a8-bb35885e9245", // uuid of the document
            "url": "$url", // DRC url of the document
            "titel": "Some document", //  title of the document
            "versie": 1, // version of the document to be signed
            "bestandsnaam" : "some file.docx" // filename of the document;
        }
    ],
    "ondertekenaars": [ // list of signers
        {
            "e-mail": "john.doe@some.domain", // e-mail of signer
            "voornaam": "John", // first name of signer
            "achternaam": "Doe", // last name of signer
            "identificatie": "Signer1", // string to identify the signer; can be used to relate this signer to specific signing areas or placeholders in the documents (not all signing software might need this property but supplying it should not cause errors)
            "volgorde": 1, // order number used to determine in which order the signers should sign in case of multiple signers
            "authenticatie": { // Method of authentication this signer should use to identify themselves
                "methode": "sms",
                "waarde": "+31655555555" // phone number of signer
            }
        }
    ]
}
```

Some details about properties that might not be clear from the description:

- _bewijs_informatieobjecttype_: Depending on the vendor and/or configuration of the signing software, a separate evidence document with proof of signing might be added to the case as part of the signing flow. This property specifies which informatieobjecttype should be used for this document.
- _documenten[ ].versie_: The exact version of the document to be signed. The signing software should retrieve this version to present it to the signers.
- _documenten[ ].bestandsnaam_: Signing software often accepts different document formats (i.e. Microsoft Word, Open Office, PDF) as input, but the signed version will always be PDF. In case the format of the signed version differs from the original, the filename should be updated with the new extension.
- _ondertekenaars[ ].identificatie_: A string that can be used by the signing software to determine where in the document the signature of this signer should appear (usage of this field might vary between vendors and not all signing software might require this field)
- _ondertekenaars[ ].authenticatie_: This property indicates how the signer should authenticate themselves before the documents to be signed are presented to them. The following options should be supported at minimum:
    - _authenticatie = null_: when this property is set to null, the minimal form of authentication should be used. What this minimal is, is dependent on the signing software.
    - _authenticatie.methode = sms_: The signer should authenticate themselves using an sms with a one-time passcode (SMS OTP); for this method the property _authenticatie.waarde_ should also be provided, with the mobile phone number of the signer in international format.

### Response to the trigger message

If the trigger message is received correctly, the signing software should respond with status code 200 and this message:

```
{
    "transaction_id": "2opbDxqSB8BX3137ulqdw2q9_Mw=" // unique id of this signing transaction; format to be determined by the signing software
}
```

### NRC notification when signing is complete or has failed

When the signing is complete and the signing software has uploaded the signed documents to the DRC, it should send a notification to the NRC. The TSA or ZAC can subscribe to these notifications, for instance to notify the user that initiated the signing request.

Note that signing documents is a very asynchronous sequence: it might be several hours, days, or even longer before all signers have signed all documents in the signing request. That means the time between sending the trigger message and receiving the NRC notification can be quite long. It is recommended that while the signing transaction is in progress, the TSA or ZAC indicates this to users in the UI where the documents are displayed so the user knows these documents are awaiting signing.

When signing is completed successfully, the request to the NRC should be:

```
{
    "kanaal": "documentacties",
    "hoofdObject": ""$url"", // ZRC url of the case
    "resource": "zaak",
    "resourceUrl": ""$url"", // ZRC url of the case
    "actie": "OndertekenenVoltooid", // this value indicates this notification is about a successfully completed signing transaction
    "aanmaakdatum": "2025-01-01T12:00:00Z", // date-time of this notification
    "kenmerken": {
        "transaction_id": "2opbDxqSB8BX3137ulqdw2q9_Mw=" // id of this signing transaction, same as in the response on the trigger message
    }
}
```

When signing has failed, is cancelled or has otherwise not completed successfully, the request to the NRC should be:

```
{
    "kanaal": "documentacties",
    "hoofdObject": ""$url"", // ZRC url of the case
    "resource": "zaak",
    "resourceUrl": ""$url"", // ZRC url of the case
    "actie": "OndertekenenAfgebroken", // this value indicates this notification is about a failed signing transaction
    "aanmaakdatum": "2025-01-01T12:00:00Z", // date-time of this notification
    "kenmerken": {
        "reden": "reason", // string specifying why the transaction has not completed, for instance "refused by signer", "retracted" or "technical error ..." (preferably in Dutch, so it can be presented to the end user in the TSA or ZAC)
        "transaction_id": "2opbDxqSB8BX3137ulqdw2q9_Mw=" // Id of this signing transaction, same as in the response on the trigger message
    }
}
```

Some details about these notifications:

- _kanaal = documentacties_: As there is no channel for this action defined in the ZGW specification and it is not allowed to post custom notifications to existing channels, this article proposes a custom channel for actions on documents. Adding new channels is allowed within the NRC specification. This also ensures only applications interested in these notifications will receive them.
- _resource = zaak_: It might seem counter-intuitive that the resource of this notification is _zaak_ instead of _document_ and that the _resourceUrl_ and _hoofdObject_ properties are set to the url of the case. The reason for this is that one signing transaction can concern multiple documents but will always be initiated from the context of a single case.
