---
title: "Use of Subscriptions for Notifications"
description: "A comprehensive guide on creating and managing subscriptions for ZGW API notifications, detailing filter options for various channels like Zaken, Besluiten, and Documenten."
keywords: [subscriptions, notifications, filters, ZGW, API, webhooks, callbacks, Zaken, Besluiten, Documenten, OneGround, Roxit]
slug: /notifications/notification-subscription-usage-guide
---

# Use of Subscriptions for Notifications

## What is a subscription?

A subscription (abonnement) is a registration that allows an application to be automatically notified of changes.

## Examples

- A client application that needs to update information when a case is closed can receive notifications when the end status of cases is set;
- A client that indexes documents can receive a notification when documents are created or changed.

## Recommendations

- Only create subscriptions for objects or events that are relevant to your application;
- Restrict the number of notifications by using filter values in your subscriptions;
- Regularly check whether the subscriptions are still needed and remove unnecessary subscriptions;
- Keep the authorization structure in mind: subscriptions do not grant access to objects for which you do not have rights.

## Fields in the Subscription Creation Message

| Field Name  | Description                                                                                                                                              | Value Type                                                                                      | Example                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------ |
| callbackUrl | The URL to which notifications will be sent.                                                                                                             | URL                                                                                             | https://myapp.zaakgerichtwerken.nl/webhook |
| auth        | Value of bearer token                                                                                                                                    | String                                                                                          | Bearer 8a0WWCKMgh1EIBlD2g1b6yQDtTpIgFYE    |
| kanalen     | Channels to which you can subscribe. Standard channels are zaken, besluiten, documenten, zaaktypen, besluittypen, informatieobjecttypen and autorisaties | Array of Objects. Each object consists of filters (explained below) and the name of the channel | See below                                  |

## Possible Values for Filters

Filters allow your application to limit the notifications it receives to only those changes that match specific criteria. Each channel supports its own set of filter fields. When evaluating filter values, they are combined using AND logic, meaning that only changes matching _all_ specified filters will trigger a notification. Below you will find the possible filter fields for each channel. The value of a filter field always is a single string. If you need to subscribe to multiple values you can either create multiple subscriptions or an array of channels within a subscription.

### Filters for the Zaken channel

| Filter Key                    | Description                                                                                                                       | Allowed/Example Values                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `#resource`                   | The resources as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself | zaak, status, zaakobject, zaakinformatieobject, zaakeigenschap, rol, resultaat, zaakbesluit              |
| `#actie`                      | The actions as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself   | create, update, destroy                                                                                  |
| `bronorganisatie`             | The rsin of the organization that initiated or owns the case in the field bronorganisatie                                         | 000001375                                                                                                |
| `zaaktype`                    | URL's of the casetype versions of the case in the field zaaktype                                                                  | https://ztc.zgw.nl/api/v1/zaaktypen/b1fac1a1-7117-1e50-1d01-d155a715f1ed                                 |
| `vertrouwelijkheidaanduiding` | The confidentiality indication of the case in field vertrouwelijkheidaanduiding                                                   | openbaar, beperkt_openbaar, intern, zaakvertrouwelijk, vertrouwelijk, confidentieel, geheim, zeer_geheim |
| `zaaktype_identificatie`      | The case type in the field 'identificatie' of zaaktype                                                                            | RX-ADVIES                                                                                                |
| `archiefstatus`               | The archival status of the case in field archiefstatus                                                                            | nog_te_archiveren, gearchiveerd, gearchiveerd_procestermijn_onbekend, overgedragen                       |
| `archiefnominatie`            | The archival nomination of the case in field archiefnominatie.                                                                    | blijvend_bewaren, vernietigen                                                                            |
| `opdrachtgevende_organisatie` | The rsin of the organization that commissioned the case in field opdrachtgevendeOrganisatie                                       | 123443210                                                                                                |
| `catalogus`                   | The URL of the catalog to which the case type belongs.                                                                            | https://ztc.zgw.nl/api/v1/catalogussen/fe0ff0r5-fdd1-5011-1177-d15ac1d1f1ed456                           |
| `domein`                      | The domain of the catalog in field domein of catalogus                                                                            | VTH                                                                                                      |
| `is_eindzaakstatus`           | Indicates whether the case is in its final status in field isEindstatus of statustype.                                            | True, False                                                                                              |

### Filters for the Besluiten channel

| Filter Key                      | Description                                                                                                                       | Allowed/Example Values                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `#resource`                     | the resources as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself | besluit, besluitinformatieobject                                            |
| `#actie`                        | The actions as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself   | create, update, destroy                                                     |
| `besluittype`                   | URL of the decision type version in the field besluittype                                                                         | https://ztc.zgw.nl/api/v1/besluittypen/ce571dae-f0c1-a1e5-115a-f1acc1d171e5 |
| `verantwoordelijke_organisatie` | Rsin of the organisation responsible for the decision in field verantwoordelijkeOrganisatie                                       | 010110100                                                                   |
| `besluittype_omschrijving`      | The decision type in field omschrijving of besluittype                                                                            | Beschikken op aanvraag                                                      |
| `catalogus`                     | The URL of the catalog in field catalogus of besluittype                                                                          | https://ztc.zgw.nl/api/v1/catalogussen/fe0ff0r5-fdd1-5011-1177-d15ac1d1f1ed |
| `domein`                        | The domain of the catalog in field domein of catalogus                                                                            | VTH                                                                         |

### Filters for the Documenten channel

| Filter Key                          | Description                                                                                                                       | Allowed/Example Values                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `#resource`                         | the resources as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself | enkelvoudiginformatieobject, gebruiksrechten, verzending                                                 |
| `#actie`                            | The actions as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself   | create, update, destroy                                                                                  |
| `bronorganisatie`                   | The rsin of the organization that initiated or received and owns the document in the field bronorganisatie                        | 813264571                                                                                                |
| `informatieobjecttype`              | URL of the information object type version in field informatieobjecttype                                                          | https://ztc.zgw.nl/api/v1/informatieobjecttypen/cadd1ce5-5a1a-7070-dabb-c1a551f1ab1e                     |
| `vertrouwelijkheidaanduiding`       | Confidentiality indication in field vertrouwelijkheidaanduiding                                                                   | openbaar, beperkt_openbaar, intern, zaakvertrouwelijk, vertrouwelijk, confidentieel, geheim, zeer_geheim |
| `informatieobjecttype_omschrijving` | Document type in field omschrijving of informatieobjecttype                                                                       | Bijlage bij verzoek                                                                                      |
| `catalogus`                         | The URL of the catalog in field catalogus of informatieobjecttype                                                                 | https://ztc.zgw.nl/api/v1/catalogussen/fe0ff0r5-fdd1-5011-1177-d15ac1d1f1ed                              |
| `domein`                            | The domain of the catalog in field domein of catalogus                                                                            | VTH                                                                                                      |
| `status`                            | Status of the document in field status                                                                                            | in_bewerking, ter_vaststelling, definitief, gearchiveerd                                                 |
| `inhoud_is_vervallen`               | Whether the content has expired in field inhoudIsVervallen                                                                        | True, False                                                                                              |

### Filters for the Zaaktypen channel

| Filter Key  | Description                                                                                                                       | Allowed/Example Values                                                      |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `#resource` | the resources as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself | zaaktype                                                                    |
| `#actie`    | The actions as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself   | create, update, destroy                                                     |
| `catalogus` | The URL of the catalog in field catalogus                                                                                         | https://ztc.zgw.nl/api/v1/catalogussen/fe0ff0r5-fdd1-5011-1177-d15ac1d1f1ed |
| `domein`    | The domain of the catalog in field domein of catalogus                                                                            | VTH                                                                         |

### Filters for the Informatieobjecttypen channel

| Filter Key  | Description                                                                                                                       | Allowed/Example Values                                                      |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `#resource` | the resources as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself | informatieobjecttype                                                        |
| `#actie`    | The actions as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself   | create, update, destroy                                                     |
| `catalogus` | The URL of the catalog in field catalogus                                                                                         | https://ztc.zgw.nl/api/v1/catalogussen/fe0ff0r5-fdd1-5011-1177-d15ac1d1f1ed |
| `domein`    | The domain of the catalog in field domein of catalogus                                                                            | VTH                                                                         |

### Filters for the Besluittypen channel

| Filter Key  | Description                                                                                                                       | Allowed/Example Values                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `#resource` | the resources as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself | besluittype                                               |
| `#actie`    | The actions as listed in the ZGW Open Api Specification, and presented in the resource field in the notification message itself   | create, update, destroy                                   |
| `catalogus` | The URL of the catalog in field catalogus                                                                                         | https://.../catalogi/fe0ff0r5-fdd1-5011-1177-d15ac1d1f1ed |
| `domein`    | The domain of the catalog in field domein of catalogus                                                                            | VTH                                                       |

## Example: get a notification when the case in the VTH domain has closed

```json
{
    "callbackUrl": "https://myapp.zaakgerichtwerken.nl/webhook",
    "auth": "Bearer 8a0WWCKMgh1EIBlD2g1b6yQDtTpIgFYE",
    "kanalen": [
        {
            "filters": {
                "domein": "VTH",
                "is_eindzaakstatus": "True"
            },
            "naam": "zaken"
        }
    ]
}
```

## More information

See the general documentation on [notifications](https://vng-realisatie.github.io/gemma-zaken/ontwikkelaars/handleidingen-en-tutorials/notificeren) and [API notifications](https://vng-realisatie.github.io/gemma-zaken/standaard/notificaties/redoc-1.0.0).
