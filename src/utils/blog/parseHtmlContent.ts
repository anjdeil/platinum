export function parseHtmlContent(htmlContent: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  return doc.body.textContent || '';
}
