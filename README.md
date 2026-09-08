# CV — Serhii Sydoruk

pnpm monorepo for [sidoruk-sv.github.io/cv](https://sidoruk-sv.github.io/cv).

## Structure

```
packages/
  cv/              @cv/app — resume.json, Folio web, PDF export scripts
  theme-pdf/       jsonresume-theme-cv-pdf — ATS PDF theme (local fork)
```

## Prerequisites

- Node.js 24+
- pnpm 10 (via Corepack)
- Python 3 (for `pnpm audit:pdf`)

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
```

## Setup

From repo root:

```bash
pnpm install
```

## Commands (run from repo root)

| Script                  | Description                               |
| ----------------------- | ----------------------------------------- |
| `pnpm lint`             | Validate `packages/cv/resume.json`        |
| `pnpm build`            | Generate Folio site (`packages/cv/index.html`) |
| `pnpm export:pdf`       | ATS PDF via local theme                   |
| `pnpm export:pdf:folio` | Visual PDF (Folio)                        |
| `pnpm audit:pdf`        | PDF parse check (ats-reader)              |
| `pnpm audit:ats`        | HTML ATS check — Folio                    |
| `pnpm audit:ats:pdf`    | HTML ATS check — PDF theme                |
| `pnpm serve`            | Preview Folio at http://localhost:4000    |

## Workflow

1. Edit `packages/cv/resume.json`
2. `pnpm lint`
3. `pnpm build` — refresh web output in `packages/cv/`
4. `pnpm export:pdf` — application PDF
5. `pnpm audit:pdf` — verify ATS extraction

## Deployment

GitHub Pages deploys automatically via `.github/workflows/pages.yml` on push to `master`/`main`. **GitHub Pages is free** for public repositories.

Configure repo **Settings → Pages → Source: GitHub Actions**.

The workflow builds the ATS PDF, generates the Folio site, and publishes `packages/cv/` (including `CNAME` for `sydoruk.com`).

PDF URL: `https://sydoruk.com/CV_Serhii_Sydoruk_Senior_Frontend.pdf`

## Theming

- **Folio** (`pnpm build`) — web; overrides in `packages/cv/override.css`
- **jsonresume-theme-cv-pdf** (`packages/theme-pdf`) — ATS PDF with reference design tokens; edit `src/Resume.jsx` and `src/pdfStyles.js`
- Theme comparison: [docs/ats-themes.md](docs/ats-themes.md)
