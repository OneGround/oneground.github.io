---
description: "Create a new changelog release note entry"
agent: "agent"
argument-hint: "Describe the changes in this release"
---

Create a new changelog release note for the OneGround developer portal.

## Instructions

1. Determine the **version number** and **release date** from the user's input. If not provided, ask.
2. Create the file at `changelog/{YYYY}/{MM-DD}-release-{VERSION}.md` where YYYY is the year of the release date.
3. Use this frontmatter:

```yaml
---
slug: "{VERSION}"
title: "{VERSION}: Short description"
---
```

4. Add a Markdown table with these exact columns:

```markdown
| Component | Summary (english) | Relevance for consumers (English) | Relevance for end users (Dutch) | Relevance for system administration (Dutch) |
| --------- | ----------------- | --------------------------------- | ------------------------------- | ------------------------------------------- |
```

5. Valid components: **ZRC** (Cases), **DRC** (Documents), **ZTC** (Catalogs), **NRC** (Notifications), **AC** (Authorization).
6. Fill English columns from the user's description. Translate relevant columns to Dutch.
7. Leave cells empty (not "N/A") when a column doesn't apply.

Reference a recent entry for formatting: [latest changelog](../changelog/2026/04-16-release-2026.4.13.md)

After creating the file, run `npm run format`.
