---
title: "Authorization Management for ZGW APIs in OneGround"
description: "Learn how to configure and manage authorizations for ClientIDs in OneGround ZGW APIs. Set up application permissions, authorization profiles, and secure access controls for your ZGW components."
keywords:
    - authorization
    - permissions
    - ClientID authorization
    - ZGW security
    - OneGround access control
    - application permissions
    - authorization profiles
    - API security
    - access management
---

# Authorizations

## How it works

The ZGW standard has a function to create an <em>application</em> with multiple Client ID's.
The application has associated Authorizations.
When a client application calls a ZGW Api, it's bearer token is checked and the ClientID is extracted. If the token and ClientID are valid, the ZGW component looks up the associated Authorizations in the AC.

## How to create applications/Authorizations

Authorizations vcan be added using the configuration tool of OneGround.
We advice to use only one ClientID per Application so that you can adjust Authorizations per application if needed.
We also advice to restrict Authorizations as much as possible to prevent unwanted effects. For example, if an aplication has 'all Authorizations', it also has permission for deletion of all cases.

The tool helps you in creating a meaningful Authorization by providing suggestions in the form of "Authorization profiles".

## Limitations of the OneGround configuration tool

Our tool only supports only one ClientID per application (whereas the api's allow multiple ClientID's) so that configuraton is as easy and clear as possible.  
Also it does not provide the possibility (supported by the Api's) to add an Authorization per casetype. The reason is that this feature has shown many problems in previous versions of our tooling: applications could not access cases with newer (versions of) casetypes than configured, but also not of older versions.
