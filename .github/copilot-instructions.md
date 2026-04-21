# OneGround Developer Portal

Docusaurus 3 site for [dev.oneground.nl](https://dev.oneground.nl) — Dutch ZGW (Zaakgericht Werken) API documentation.

**Stack**: Docusaurus 3, React 19, TypeScript, Infima CSS, Prettier. Node >=20.

## Commands

| Command               | Purpose                                  |
| --------------------- | ---------------------------------------- |
| `npm start`           | Dev server with hot reload               |
| `npm run build`       | Production build → `build/`              |
| `npm run format`      | **CRITICAL** — Run before finishing work |
| `npm run test:format` | Check formatting (runs in CI)            |
| `npm run typecheck`   | TypeScript validation                    |

CI runs `test:format` + `build` on PRs. Formatting failures block merge.

## Project Structure

- `docusaurus.config.ts` — Site config, plugins, navbar, footer, redirects
- `sidebars.ts` — Manual sidebar definition (new docs must be added here)
- `docs/` — Documentation (Markdown/MDX with frontmatter: title, description, keywords, slug)
- `blog/` — Blog posts (`YYYY-MM-DD-title.md`), authors in `blog/authors.yml`, tags in `blog/tags.yml`
- `changelog/` — Release notes organized by year (`changelog/YYYY/MM-DD-release-VERSION.md`)
- `src/pages/` — Standalone React pages (e.g., `index.tsx` = homepage)
- `src/components/` — Reusable React components
- `src/css/custom.css` — Global Infima overrides (primary color: `#582754`)
- `src/theme/` — Swizzled Docusaurus theme wrappers (avoid adding more unless necessary)
- `static/img/` — Images referenced via `/img/...`
- `static/files/` — Downloadable files referenced via `/files/...`

## Conventions

- **Doc links**: Use relative file paths (`[Link](./doc-file.md)`), not URL paths
- **Sidebar**: Manual — every new doc needs an entry in `sidebars.ts`
- **React**: Functional components with TypeScript
- **Styling**: CSS modules or Infima utility classes; `src/css/custom.css` for global changes
- **Frontmatter**: Required in all docs — `title`, `description`, `keywords`, `slug`
- **Admonitions**: `:::note`, `:::tip`, `:::warning`, `:::danger`
- **Redirects**: When moving/renaming pages, add redirects in `docusaurus.config.ts` (`@docusaurus/plugin-client-redirects`)

## Changelog Format

Release notes live in `changelog/YYYY/MM-DD-release-VERSION.md`. Frontmatter:

```yaml
---
slug: "VERSION"
title: "VERSION: Short description"
---
```

Content is a Markdown table with bilingual columns:

```markdown
| Component | Summary (english) | Relevance for consumers (English) | Relevance for end users (Dutch) | Relevance for system administration (Dutch) |
```

Components: ZRC (Cases), DRC (Documents), ZTC (Catalogs), NRC (Notifications), AC (Authorization).
