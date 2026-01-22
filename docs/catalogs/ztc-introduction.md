---
title: "Introduction to Catalogs"
description: "Overview of the ZGW Catalogs (ZTC) system, managing the definitions and blueprints for cases."
keywords: [catalogs, introduction, ZTC, ZGW, API, OneGround, zaaktypen, blueprints]
slug: /catalogs/introduction
---

# Introduction to Catalogs

The Catalogs system (often referred to as **ZTC** or ZaakTypeCatalogus) is a foundational part of the ZGW API landscape provided by OneGround. It acts as the repository for all definitions (metadata) that describe how cases ("Zaken") and related objects should behave.

## How it works

Before an organization can work with cases, they must define _what_ those cases are. The ZTC stores these definitions.

1. **Definition**: An administrator creates a **ZaakType** (Case Type) in the catalog. This defines properties like:
    - What phases (Statustypen) the case goes through.
    - What documents (InformatieObjectTypen) are relevant.
    - What information is recorded (EigenschapTypen).
2. **Execution**: When a client application creates a new Case (via the Zaken API), it must refer to a specific **ZaakType** URL from the ZTC.
3. **Validation**: The Zaken API uses the definition in the ZTC to validate the case data and ensure the process follows the designed workflow.

## Getting Started

To effectively use the ZTC, you typically interact with a management interface or configuration tool to set up your catalogs.

1. **Create a Catalog**: A logical grouping for your definitions (Catalogus).
2. **Design Case Types**: Define the blueprints for your business processes (e.g., "Building Permit Application", "Complaint", "Internal Review").
3. **Publish**: Once a Case Type is finalized, it is published so it can be used by consumer applications.

## Key Concepts

- **Catalogus (Catalog)**: A collection of types. An organization can have one or more catalogs.
- **ZaakType (Case Type)**: The definition of a generic business process (e.g., "Vergunningaanvraag"). It determines the lifecycle and data structure of concrete Cases.
- **InformatieObjectType (Information Object Type)**: The definition of a document type (e.g., "ID Card Copy", "Decision Document").
- **BesluitType (Decision Type)**: The definition of a specific decision that can be taken within a case.
- **StatusType**: Defines a possible state in the lifecycle of a case.

## Official Standards (VNG)

The OneGround Catalogs system is implemented according to the standards defined by VNG Realisatie. The official standards provide the complete specification:

- **[VNG Catalogussen Standard](https://vng-realisatie.github.io/gemma-zaken/standaard/catalogi/)**  
   The core specification for the Catalogs API (Catalogi services). It defines the resources and relations for case types, document types, and more.

For further technical details, please refer to the specific documentation pages in this section.
