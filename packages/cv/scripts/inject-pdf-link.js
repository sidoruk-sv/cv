#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const PDF_FILENAME = 'CV_Serhii_Sydoruk_Senior_Frontend.pdf';
const MARKER_CLASS = 'cv-pdf-link';
const indexPath = path.join(__dirname, '..', 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

if (html.includes(MARKER_CLASS)) {
  process.exit(0);
}

const pdfItem = [
  `<div class="contact-item svelte-10f9ycp ${MARKER_CLASS}">`,
  '<span class="fa-regular fa-file-pdf icon svelte-10f9ycp"></span>',
  ` <a href="./${PDF_FILENAME}">PDF</a>`,
  '</div>',
].join('');

const barStart = html.indexOf('class="contact-bar');

if (barStart === -1) {
  throw new Error('contact-bar not found in index.html');
}

const headerEnd = html.indexOf('</header>', barStart);
const insertAt = html.lastIndexOf('</div>', headerEnd);

if (insertAt === -1 || insertAt <= barStart) {
  throw new Error('Could not locate contact-bar closing tag');
}

html = `${html.slice(0, insertAt)}${pdfItem}${html.slice(insertAt)}`;
fs.writeFileSync(indexPath, html);

console.log(`Added PDF link to index.html (${PDF_FILENAME})`);
