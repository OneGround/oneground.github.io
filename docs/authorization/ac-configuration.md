---
title: "Configuration & Tooling"
description: "Guidance on using the OneGround configuration tool for Authorizations, including profiles and best practices."
keywords: ["configuration", "tooling", "authorizations", "profiles", "OneGround", "limitations"]
slug: /authorization/configuration
---

# Configuration & Tooling

:::info OneGround Unlimited Only
The configuration tool described in this section is exclusive to **OneGround Unlimited** (the managed SaaS solution). It is not available in the open-source version of the components.
:::

Authorizations in OneGround Unlimited are managed via the detailed configuration tool. This tool simplifies the assignment of permissions using predefined profiles and enforces specific best practices for stability.

## Authorization Profiles

Instead of manually configuring every granular permission scope, the tool utilizes **Authorization profiles**. These profiles perform two main functions:

1. **Simplification**: They group logical sets of permissions together.
2. **Suggestion**: They guide you toward meaningful authorization sets for common use cases.

## Best Practices

### One Client ID per Application

We strongly advise configuring only **one Client ID per Application**.

- **Reason**: This establishes a clear 1-to-1 relationship between your configuration and the external consumer.
- **Benefit**: It allows you to adjust Authorizations for a specific application without unintended side effects on other consumers sharing the same resource.

### Restrict Permissions (Least Privilege)

Always restrict Authorizations as much as possible.

- **Risk**: Granting broad access (e.g., 'all Authorizations') can have severe consequences, such as an application having the permission to **delete all cases**.
- **Advice**: Only assign the profiles strictly necessary for the application's function.

## Tool Limitations & Design Decisions

The OneGround configuration tool implements specific constraints to ensure system stability.

### Single Client ID Enforcement

While the ZGW API standard allows multiple Client IDs for a single Application entity, our tool restricts this to one. This decision was made to keep the configuration view simple and unambiguous for administrators.

### Case Type Granularity

The tool does **not** support restricting Authorizations to specific Case Types (Zaaktypes).

- **Background**: The API standard supports this feature.
- **Issue**: In previous versions of our tooling, this granularity caused significant maintenance problems. Applications frequently lost access to cases when new versions of a Case Type were published, or conversely, could not access older versions.
- **Solution**: By omitting this granularity in the tool, we ensure consistent access across all versions of a case type, preventing "breaking changes" in permissions during functional updates.
