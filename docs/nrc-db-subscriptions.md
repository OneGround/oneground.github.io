# Explanation of the Notification database tables for subscriptions

This document describes the subscription data model in the NRC database. The aim is to clarify the usage of the tables and especially the purpose of table abonnementkanalen that seemingly contains double records. We will explain that these double records are necessary for proper functioning of notification. There are four relevant tables: kanalen, abonnementen, abonnementkanalen, and filtervalues. The following ERD shows their relationships:

![alt text](./nrc_db_subscriptions-1.png)

Below follows an explanation of each of the tables.

## kanalen

The 'kanalen' table corresponds to the ['kanaal' resource in the OAS](https://vng-realisatie.github.io/gemma-zaken/standaard/notificaties/redoc-1.0.0#tag/kanaal/operation/kanaal_create). It represents the source from which notifications originate, such as 'zaken' in the ZRC.
The key columns are:

1. id: PrimaryKey of table 'kanalen'
2. naam: name of the 'kanaal', for example 'zaken' or 'besluiten'
3. documentatielink: the URL to documentation about the 'kanaal'
4. filters: List of possible filter attributes for a kanaal. These filter attributes can be used when creating a subscription.

## abonnementen

The 'abonnementen' table corresponds to the ['abonnement' resource in the OAS](https://vng-realisatie.github.io/gemma-zaken/standaard/notificaties/redoc-1.0.0#tag/abonnement/operation/abonnement_create).
Subscriptions on ZGW notifications received by POST request are stored in this table. The most important columns are:

1. id: PrimaryKey of table abonnementen
2. callbackurl: the full URL of the application's webhook to which the notification should be sent
3. auth: bearer token of the webhook receiver for authorization
4. owner: rsin of the organization that gives the application access

## abonnementkanalen

The 'abonnementkanalen' table corresponds to the individual elements in the 'kanalen' array within 'abonnement' in the OAS.
The table thus establishes the N:M relationship between 'abonnementen' and 'kanalen', which is enabled by the OAS. The PrimaryKey (id) of the table is referenced by the filtervalues table. This allows for a single subscription to be related to the same 'kanaal' multiple times (seemingly double information), but with different filter values in the filtervalues table ​​each time.

The key columns are:

1. id: PrimaryKey of table 'abonnementkanalen'
2. abonnement_id: ForeignKey pointing to a abonnement in the 'abonnementen' table
3. kanaal_id: ForeignKey pointing to a kanaal in the 'kanalen' table

## filtervalues

The 'filtervalues' table corresponds to the 'filters' element within 'abonnement' in the OAS.

Often, it is undesirable to receive all notifications from a kanaal, as this would generate a lot of message traffic. Therefore, it is possible to specify filters on fields from the underlying kanaal in the subscription. Only notifications that match these filter values are being sent thus reducing traffic. The filters are stored in the filtervalues table.

The most important columns are:

1. id: PrimaryKey of table 'filtervalues'
2. abonnement_kanaal_id: foreign key to 'abonnementkanalen' table
3. key: the name of the filter. Possible values are shown in the table 'kanalen' in column 'filters'. Additionally, the values '#resource' and '#actie' are possible in the key field. These refer to the events that trigger the notification to be sent by the resource of the kanaal.
4. value: the value of the filter to be matched.

For example, a filter-value definition for the 'zaken' kanaal could look like this:

- key='domein'
- value='VTH'

In this example, the notification is only delivered if the zaak in question has a zaaktype from the catalog of domein 'VTH'.

The data model allows for multiple filtervalues for each 'abonnementkanalen'. The example below illustrates this:

Abonnementkanalen 1 of abonnement X
Filter A:

- key='#resource'
- value='zaakinformatieobject'

Filter B:

- key='#actie'
- value='create'

Abonnementkanalen 2 of abonnement X
Filter A:

- key='#resource'
- value='zaakinformatieobject'

Filter B:

- key='#actie'
- value='destroy'

The combination of filters within an abonnementkanaal is evaluated as 'AND'. The combination of filters among abonnementkanalen of the same abonnement is evaluated as 'OR'. In this example therefore, the client application will only receive a notification from the zaken kanaal when a zaakinformatieobject is created or deleted.
