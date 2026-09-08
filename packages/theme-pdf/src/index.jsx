import { renderToString } from 'react-dom/server';
import Resume from './Resume.jsx';
import { normalizeResume } from './format.js';
import { pdfRenderOptions, pdfStyles } from './pdfStyles.js';

export { pdfRenderOptions };

export function render(resumeInput, options = {}) {
  const {
    locale = 'en',
    dir = 'ltr',
    title = resumeInput.basics?.name || 'Resume',
    structured = false,
  } = options;

  const resume = normalizeResume(resumeInput);
  const bodyHtml = renderToString(<Resume resume={resume} />);

  const head = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${pdfStyles}</style>
`;

  const html = `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>${head}</head>
<body>
  ${bodyHtml}
</body>
</html>`;

  if (structured) {
    return {
      html,
      head,
      body: bodyHtml,
      locale,
      dir,
    };
  }

  return html;
}

export { Resume };
export default { render, pdfRenderOptions };
