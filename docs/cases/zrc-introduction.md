---
title: "Introduction to Cases"
description: "Overview of the ZGW Cases (ZRC) system, managing the registration and lifecycle of cases."
keywords: [cases, introduction, ZRC, ZGW, API, OneGround, zaken, zaak, registration]
slug: /cases/introduction
---

# Introduction to Cases

The Cases system (often referred to as **ZRC** or Zaak Registratie Component) is a core part of the ZGW API landscape provided by OneGround. It provides a standardized way to register, track, and manage cases ("Zaken") — the central objects representing any government process or service request.

## How it works

A "Zaak" represents an instance of a business process for a specific subject (e.g., a citizen or company). The ZRC manages the full lifecycle of these cases.

1. **Creation**: A client application creates a new Case, referencing a **ZaakType** from the Catalogs (ZTC) to define its structure and rules.
2. **Status Updates**: As the process progresses, the case status is updated through predefined status types.
3. **Linking**: Related objects are attached to the case — documents (via DRC), decisions (Besluiten), roles (Rollen), and properties (Eigenschappen).
4. **Closure**: Once the process is complete, the case is finalized with an end date and result.

## Getting Started

To work with the Cases API, your application typically performs these steps:

1. **Determine the Case Type**: Look up the appropriate **ZaakType** in the Catalogs (ZTC) that matches your business process.
2. **Create a Case**: Register a new Zaak using the ZaakType reference.
3. **Manage Lifecycle**: Update the status, add roles, link documents, and record properties as the process evolves.

## Documentation Overview

We have guides to help you integrate with the Cases system:

- **[Use of BSN](./zrc-use-of-bsn)**: Best practices for securely retrieving cases associated with a BSN (Dutch Social Security Number).

## Key Concepts

- **Zaak (Case)**: The core resource representing a single instance of a business process (e.g., a permit application or a complaint).
- **Rol (Role)**: Links a person or organisation to a case in a specific capacity (e.g., initiator, behandelaar).
- **Status**: Represents the current phase of the case within its defined lifecycle.
- **Resultaat (Result)**: The final outcome of the case once it is closed.
- **ZaakObject**: Links a case to an external real-world object (e.g., an address or a parcel of land).

## Official Standards (VNG)

The OneGround Cases system is implemented according to the standards defined by VNG Realisatie. The official standards provide the complete specification:

- **[VNG Zaken Standard](https://vng-realisatie.github.io/gemma-zaken/standaard/zaken/)**
  The core specification for the Cases API (Zaken services). It defines the resources, behavior, and architecture for registering and managing cases.

For further technical details, please refer to the specific pages in this section.
