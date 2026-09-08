/**
 * PDF typography: Arial, readable sizes (11pt body), bold for scan targets.
 * Vertical rhythm uses lh multiples of the body line box.
 */

export const designTokens = `
:root {
  --resume-font-sans: Arial, sans-serif;

  /* Readable print scale — 10.5pt body balances HR readability and 2 pages */
  --resume-size-body: 10.5pt;
  --resume-size-small: 10pt;
  --resume-size-subheading: 11pt;
  --resume-size-lead: 11.5pt;
  --resume-size-name: 22pt;

  --resume-weight: 400;
  --resume-weight-bold: 700;

  --resume-line-height-body: 1.5;
  --resume-line-height-tight: 1.3;
  --resume-line-height-prose: 1.55;

  --resume-color-primary: #1a1a1a;
  --resume-color-secondary: #4a4a4a;
  --resume-color-tertiary: #666666;
  --resume-color-accent: #2563eb;
  --resume-color-accent-light: #e6f2ff;
  --resume-color-background: #ffffff;
  --resume-color-border: #e5e7eb;
  --resume-color-muted: #f3f4f6;

  --resume-space-tight: 0.25lh;
  --resume-space-item: 0.5lh;
  --resume-space-category: 0.5lh;
  --resume-space-section: 0.75lh;

  --resume-max-width: none;
  --resume-radius-sm: 3px;
}
`;

export const layoutStyles = `
@page {
  size: Letter;
  margin: 16mm 11mm 14mm 12mm;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--resume-color-background);
  font-family: var(--resume-font-sans);
  font-size: var(--resume-size-body);
  font-weight: var(--resume-weight);
  line-height: var(--resume-line-height-body);
  color: var(--resume-color-primary);
  font-synthesis: none;
  font-kerning: normal;
  font-variant-ligatures: common-ligatures;
  font-feature-settings: "kern" 1, "liga" 1;
  text-rendering: optimizeLegibility;
  text-wrap: pretty;
}

main {
  max-width: var(--resume-max-width);
  margin: 0 auto;
}

/* —— Header —— */
main > header {
  text-align: center;
  margin-block-end: var(--resume-space-section);
}

main > header h1 {
  font-size: var(--resume-size-name);
  font-weight: var(--resume-weight-bold);
  line-height: var(--resume-line-height-tight);
  letter-spacing: 0.02em;
  color: var(--resume-color-primary);
  margin-block: 0 var(--resume-space-tight);
  text-wrap: balance;
}

main > header .label {
  font-size: var(--resume-size-lead);
  font-weight: var(--resume-weight);
  line-height: var(--resume-line-height-tight);
  color: var(--resume-color-secondary);
  margin-block: 0 var(--resume-space-tight);
}

.contact-line {
  font-size: var(--resume-size-small);
  line-height: var(--resume-line-height-tight);
  color: var(--resume-color-primary);
  margin-block: 0 var(--resume-space-tight);
  text-align: center;
}

.contact-item {
  white-space: nowrap;
}

.contact-line a,
.company-link {
  color: var(--resume-color-accent);
  text-decoration: none;
}

.contact-sep {
  color: var(--resume-color-border);
  margin: 0 0.25em;
}

.summary-block,
.resume-summary {
  text-align: left;
  margin-block-start: var(--resume-space-item);
  line-height: var(--resume-line-height-prose);
  color: var(--resume-color-secondary);
}

/* —— Sections —— */
.resume-section {
  margin-block-end: var(--resume-space-section);
  page-break-inside: auto;
  break-inside: auto;
}

.resume-section-title {
  display: block;
  width: 100%;
  font-size: var(--resume-size-lead);
  font-weight: var(--resume-weight-bold);
  line-height: var(--resume-line-height-tight);
  letter-spacing: 0.04em;
  color: var(--resume-color-primary);
  margin-block: 0 0.3lh;
  padding-block-end: 0.15lh;
  border-block-end: 0.5pt solid var(--resume-color-accent);
  page-break-after: avoid;
  break-after: avoid;
  text-wrap: balance;
}

/* —— Entries —— */
.ats-entry,
.resume-item {
  margin-block-end: var(--resume-space-item);
  page-break-inside: auto;
  break-inside: auto;
}

.ats-entry:last-child,
.resume-item:last-child {
  margin-block-end: 0;
}

.ats-job-header,
.ats-edu-header,
.ats-project-header,
.resume-item-title {
  font-weight: var(--resume-weight-bold);
  line-height: var(--resume-line-height-tight);
  color: var(--resume-color-primary);
  margin-block: 0 0.2lh;
}

.ats-job-header {
  font-size: var(--resume-size-subheading);
}

.ats-edu-header,
.ats-project-header {
  font-size: var(--resume-size-lead);
}

.ats-job-header .company-link {
  color: var(--resume-color-primary);
  text-decoration: none;
}

.ats-job-header .position,
.ats-edu-header .institution {
  color: var(--resume-color-secondary);
}

.ats-job-header .dates,
.ats-edu-header .dates {
  color: var(--resume-color-tertiary);
  font-size: var(--resume-size-small);
  letter-spacing: 0.015em;
}

.ats-job-header .sep,
.ats-edu-header .sep {
  color: var(--resume-color-border);
}

.project-keywords {
  margin-block-start: 0.2lh;
}

.ats-summary,
.resume-description {
  margin-block: 0.2lh var(--resume-space-tight);
  line-height: var(--resume-line-height-prose);
  color: var(--resume-color-secondary);
}

/* —— Bullets —— */
.ats-bullets,
.resume-highlights {
  margin-block: 0.2lh 0.15lh;
  padding-inline-start: 0;
  list-style: none;
  color: var(--resume-color-primary);
}

.ats-bullets li,
.resume-highlights li {
  margin-block: 0.15lh;
  line-height: var(--resume-line-height-prose);
}

/* —— Skills / languages / interests —— */
.ats-skill-line,
.skill-group {
  margin-block: 0 var(--resume-space-category);
  line-height: var(--resume-line-height-body);
}

#skills .skill-group {
  margin-block-end: 0.4lh;
}

#interests .skill-group {
  margin-block-end: 0.25lh;
}

#skills .resume-badge {
  margin-block: 0.06em;
}

.ats-skill-line:last-child,
.skill-group:last-child {
  margin-block-end: 0;
}

.ats-skill-line strong,
.skill-group-name {
  color: var(--resume-color-primary);
  font-weight: var(--resume-weight-bold);
  letter-spacing: 0.015em;
  margin-inline-end: 0.3em;
}

.skill-keywords {
  color: var(--resume-color-secondary);
}

.resume-badge-list {
  display: inline;
  margin: 0;
}

.resume-badge {
  display: inline-block;
  padding: 0.12em 0.5em;
  margin: 0.1em 0.3em 0.1em 0;
  border-radius: var(--resume-radius-sm);
  font-size: var(--resume-size-small);
  line-height: var(--resume-line-height-tight);
  background: var(--resume-color-muted);
  color: var(--resume-color-primary);
  vertical-align: baseline;
}

.resume-badge-accent {
  background: var(--resume-color-accent-light);
  color: var(--resume-color-accent);
}

.resume-item-meta {
  font-size: var(--resume-size-small);
  color: var(--resume-color-tertiary);
  line-height: var(--resume-line-height-tight);
}

.resume-date,
.resume-location {
  color: var(--resume-color-tertiary);
}

.ats-extra-line {
  margin-block: var(--resume-space-category) 0;
  line-height: var(--resume-line-height-body);
  color: var(--resume-color-secondary);
}

.ats-extra-line:first-child {
  margin-block-start: 0;
}

.ats-extra-line strong {
  color: var(--resume-color-primary);
}

strong,
b {
  font-weight: var(--resume-weight-bold);
}

@media print {
  body {
    background: #fff;
    color: #000;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .resume-badge {
    background: var(--resume-color-muted);
    color: var(--resume-color-primary);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .resume-badge-accent {
    background: var(--resume-color-accent-light);
    color: var(--resume-color-accent);
  }

  .resume-section-title {
    page-break-after: avoid;
  }

  p,
  li,
  .ats-summary,
  .resume-description {
    widows: 3;
    orphans: 3;
    hyphens: auto;
  }

  h1,
  h2,
  .resume-section-title,
  .ats-job-header,
  .ats-project-header {
    hyphens: none;
  }

  .resume-section,
  .resume-item,
  .ats-entry {
    position: static;
    float: none;
    clear: both;
  }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
`;

export const pdfStyles = `${designTokens}\n${layoutStyles}`;

export const pdfRenderOptions = {
  format: 'Letter',
  printBackground: true,
  tagged: true,
  displayHeaderFooter: false,
  margin: {
    top: '16mm',
    right: '11mm',
    bottom: '14mm',
    left: '12mm',
  },
};
