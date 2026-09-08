#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const RESUME_PATH = path.join(ROOT, 'resume.json');
const THEME_PATH = path.join(ROOT, '../theme-pdf/dist/index.js');
const DEFAULT_OUTPUT = 'CV_Serhii_Sydoruk_Senior_Frontend.pdf';

function toDataUri(html) {
  return `data:text/html;base64,${Buffer.from(html, 'utf8').toString('base64')}`;
}

async function exportPdf() {
  const outputName = process.argv[2] || DEFAULT_OUTPUT;
  const outputPath = path.join(ROOT, outputName);

  if (!fs.existsSync(THEME_PATH)) {
    throw new Error('PDF theme not built. Run: pnpm build:theme-pdf from repo root');
  }

  const resume = JSON.parse(fs.readFileSync(RESUME_PATH, 'utf8'));
  const theme = await import(pathToFileURL(THEME_PATH).href);
  const render = theme.render || theme.default?.render;
  const pdfRenderOptions = theme.pdfRenderOptions || theme.default?.pdfRenderOptions;

  if (typeof render !== 'function') {
    throw new Error('PDF theme render() is missing');
  }

  const html = render(resume);
  const launchArgs = [];

  if (process.env.CI || process.env.RESUME_PUPPETEER_NO_SANDBOX) {
    launchArgs.push(
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    );
  }

  const browser = await puppeteer.launch({ args: launchArgs });
  const page = await browser.newPage();

  await page.emulateMediaType('print');
  await page.goto(toDataUri(html), { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    ...(pdfRenderOptions || {}),
  });
  await browser.close();

  console.log(`Done! Wrote ${outputName}`);
}

exportPdf().catch((error) => {
  console.error(error);
  process.exit(1);
});
