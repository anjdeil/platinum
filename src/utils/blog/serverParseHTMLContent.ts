import { JSDOM } from 'jsdom';

export function serverParseHTMLContent(htmlContent: string): string {
  if (typeof window !== 'undefined') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    return doc.body.textContent || '';
  } else {
    const dom = new JSDOM(htmlContent);
    return dom.window.document.body.textContent || '';
  }
}
