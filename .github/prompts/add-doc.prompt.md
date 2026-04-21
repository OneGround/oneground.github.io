---
description: "Create a new documentation page and register it in the sidebar"
agent: "agent"
argument-hint: "Topic and category for the new doc"
---

Add a new documentation page to the OneGround developer portal.

## Instructions

1. Ask the user for the **topic**, **target category**, and **content** if not provided.
2. Determine the correct `docs/` subdirectory from the category:
    - General → `docs/general/`
    - Authorization (AC) → `docs/authorization/`
    - Catalogs (ZTC) → `docs/catalogs/`
    - Notifications (NRC) → `docs/notifications/`
    - Documents (DRC) → `docs/documents/`
    - Cases (ZRC) → `docs/cases/`
3. Create the Markdown file with required frontmatter:

```yaml
---
title: "Page Title"
description: "Brief description for SEO"
keywords: [keyword1, keyword2]
slug: url-friendly-slug
---
```

4. Add the page to [sidebars.ts](../../sidebars.ts) in the correct category. Match the existing structure.
5. Use relative file paths for any cross-doc links (`[Link](./other-doc.md)`).
6. Run `npm run format` after creating the file.
