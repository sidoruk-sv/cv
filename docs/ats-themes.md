# JSON Resume themes — ATS compatibility

Comparison of common themes for **application PDFs** (what recruiters' parsers see), not portfolio websites.

Legend: **Good** = aligned with ATS best practices · **Risk** = common parser failures · **Poor** = avoid for job portals

## resume-cli HTML audit (this repo, same `resume.json`)

Run: `pnpm audit:ats` / `pnpm audit:ats:pdf` from repo root.

| Theme                                     | Score   | Grade | Notable gaps                                                                    |
| ----------------------------------------- | ------- | ----- | ------------------------------------------------------------------------------- |
| **jsonresume-theme-cv-pdf** (this repo)   | 100/100 | A     | None — purpose-built fork                                                       |
| **jsonresume-theme-reference** (official) | 100/100 | A     | None on HTML; styled-components in PDF export can trigger false table detection |
| **jsonresume-theme-straightforward**      | 93/100  | A     | Semantic HTML (6/10), Heading structure (6/10)                                  |
| **jsonresume-theme-tech**                 | 93/100  | A     | Semantic HTML (6/10)                                                            |
| **jsonresume-theme-class**                | 92/100  | A     | Fonts (10/15), single-column (12/15), a11y (13/15)                              |
| **jsonresume-theme-folio** (web)          | 89/100  | B     | Single-column (5/15), special characters (7/10)                                 |

## PDF export audit (`ats-reader` on Puppeteer output)

Run: `pnpm export:pdf && pnpm audit:pdf`

| Signal                | cv-pdf theme                                     | Folio PDF    | Notes                                                                                   |
| --------------------- | ------------------------------------------------ | ------------ | --------------------------------------------------------------------------------------- |
| Tagged PDF            | ✓                                                | varies       | Chrome `tagged: true` — good for reading order                                          |
| Sections parsed       | summary, experience, skills, projects, education | partial      | cv-pdf uses standard section names                                                      |
| Jobs parsed           | 7/7 with `Company \| Role \| Dates`              | often merged | One-line job headers matter                                                             |
| Tables CRITICAL       | ⚠ false positive                                 | often worse  | pdfplumber sees Chrome tagged-PDF structure as tables — **not** HTML `<table>` elements |
| Header/footer WARNING | ✓ none (no PDF header/footer)                     | ⚠            | Do not add Puppeteer header/footer — ats-reader flags top/bottom 10% of page        |

**Important:** HTML audit and PDF audit measure different things. A theme can score 100/100 in HTML and still get PDF warnings from Chrome's tagged output. Always run **`audit:pdf` on the exported application PDF**.

## Theme reference table

| Theme                                       | Role               | Layout                | Semantic HTML                                  | PDF/ATS notes                                                               |
| ------------------------------------------- | ------------------ | --------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| **jsonresume-theme-reference**              | Official benchmark | Single column         | `section`, `h2`, `@jsonresume/core` primitives | Best HTML audit; uses styled-components — avoid bundling for Puppeteer      |
| **jsonresume-theme-cv-pdf** (this repo)     | Application PDF    | Single column         | Plain `section`/`h2`, reference design tokens  | Reference look in plain CSS; ATS job lines; inline skill badges; tagged PDF |
| **jsonresume-theme-folio**                  | Web / portfolio    | Multi-section, avatar | Good structure; Font Awesome icons             | **Web only** — icons invisible to parsers; use for GitHub Pages             |
| **jsonresume-theme-straightforward**        | General (2026)     | Single column         | Handlebars, minimal                            | 93/100 — weaker heading semantics                                           |
| **jsonresume-theme-class**                  | Self-contained web | Single column         | Semantic, offline                              | 92/100 — custom font stack                                                  |
| **jsonresume-theme-tech**                   | Tech CV            | Single column         | Claims ATS-optimized                           | 93/100 — verify PDF pipeline separately                                     |
| **jsonresume-theme-modern**                 | Legacy             | Often multi-column    | Older templates                                | **Risk** — sidebars/columns scramble reading order                          |
| **jsonresume-theme-elegant / flat / paper** | Visual             | Varies                | Varies                                         | Often tables, floats, or icons — **Poor** for ATS PDF                       |

## What ATS parsers actually check

From [ats-reader](https://github.com/erikcaineolson/ats-reader) (used by `pnpm audit:pdf`):

| Signal                            | Why it matters                                                            |
| --------------------------------- | ------------------------------------------------------------------------- |
| **Tagged PDF**                    | Explicit reading order vs guessing from coordinates                       |
| **No layout tables**              | pdfplumber heuristics; Chrome tagged PDF can false-positive               |
| **Standard section names**        | `Work Experience`, `Skills`, `Education` — not creative labels            |
| **Job line structure**            | Dates + title + company on predictable lines (`Company \| Role \| Dates`) |
| **Real bullet markers**           | `-` or `•` at line start — not invisible list styling alone               |
| **Single column**                 | Multi-column CSS breaks vertical reading order                            |
| **Standard fonts**                | Helvetica/Arial/Times — avoid icon fonts for contact info                 |
| **No header/footer-only content** | Chrome PDFs often flag top 10% of page (heuristic false positive)         |

## Recommended split (this monorepo)

| Output              | Theme                  | Why                                                   |
| ------------------- | ---------------------- | ----------------------------------------------------- |
| **Website**         | Folio + `override.css` | Rich layout, avatar, Gravatar                         |
| **Application PDF** | `packages/theme-pdf`   | Reference visual language + ATS structure in one fork |

## Official / core packages

- [@jsonresume/core](https://www.npmjs.com/package/@jsonresume/core) — design tokens, primitives, print CSS (source for reference styling)
- [jsonresume-theme-reference](https://www.npmjs.com/package/jsonresume-theme-reference) — official ATS template; use as **design reference**, fork for PDF-specific markup
- [resume-cli `audit`](https://github.com/jsonresume/resume-cli) — HTML theme scoring

## cv-pdf theme — reference styles restored (plain CSS)

Forked from reference / `@jsonresume/core` tokens without styled-components:

- Accent `#2563eb` section underlines (`resume-section-title`)
- Centered header, accent contact links
- Skill **badges** (`resume-badge`, `resume-badge-accent`) — inline, not flex layout
- Typography scale, secondary/tertiary text colors
- Print rules: widows/orphans, hyphens, `print-color-adjust`
- ATS markup: one-line job headers, explicit `-` bullets, separate Interests section

## How to re-test

```bash
pnpm audit:ats              # Folio HTML
pnpm audit:ats:pdf          # PDF theme HTML (100/100 expected)
pnpm export:pdf && pnpm audit:pdf        # ATS application PDF
```

When evaluating any new theme, always run **`audit:pdf` on the exported PDF**, not only HTML audit — Puppeteer output differs from browser HTML.
