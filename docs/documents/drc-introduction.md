---
title: "Introduction to Documents"
description: "Overview of the ZGW Documents (DRC) system, managing storage and retrieval of documents and metadata."
keywords: [documents, introduction, DRC, ZGW, API, OneGround, storage, files]
slug: /documents/introduction
---

# Introduction to Documents

The Documents system (often referred to as **DRC** or Document Registration Component) is a crucial part of the ZGW API landscape provided by OneGround. It allows client applications to store, retrieve, and manage documents (EnkelvoudigInformatieObjecten) and their metadata in a standardized way.

## How it works

The DRC serves as the central register for documents within the application landscape. It handles both the binary content (the file itself) and the metadata describing it.

1. **Creation**: A client application creates a document object, providing metadata (like title, confidentiality, author).
2. **Content Upload**: The actual file content is uploaded to the DRC.
3. **Storage**: The DRC securely stores the file and indexes the metadata.
4. **Linking**: The document is often linked to a process or object in another system (e.g., a "Zaak" in the ZRC).
5. **Retrieval**: Authorized applications and users can search for and download the document.

## Getting Started

To work with the Documents API, your application usually performs these high-level steps:

1. **Locking (Optional)**: In some workflows, you might lock a document to prevent concurrent edits.
2. **Upload**: Use the API to upload the physical file and its metadata.
3. **Versioning**: Manage different versions of a document if supported/required.

## Documentation Overview

We have guides to help you integrate with the Documents system:

- **[Example Document Upload](./example-document-upload)**: A step-by-step guide on how to upload a document to the API.

## Key Concepts

- **EnkelvoudigInformatieObject (EIO)**: The core resource representing a document. It contains metadata such as the title, creation date, and language.
- **Inhoud**: The physical content of the document (the byte stream).
- **Gebruiksrechten**: Metadata defining who is allowed to read, write, or destroy the document.
- **Vertrouwelijkheidaanduiding**: Indicates the confidentiality level of the document (e.g., Openbaar, Beperkt Openbaar, Vertrouwelijk).

## Official Standards (VNG)

The OneGround Documents system is implemented according to the standards defined by VNG Realisatie. While this documentation covers the specific implementation and usage within OneGround, the official standards provide the complete specification:

- **[VNG Documenten API Standard](https://vng-realisatie.github.io/gemma-zaken/standaard/documenten/)**  
   The core specification for the Documents API. It defines the resources, behavior, and architecture for storing and managing information objects.

For further technical details, please refer to the specific pages in this section.
