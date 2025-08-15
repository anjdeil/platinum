import { BreadcrumbType } from "@/types/components/global/breadcrumbs";
import { BASE_URL } from "./consts";

interface BreadcrumbSchema {
  "@type": string;
  "position": number;
  "item": string;
  "name": string;
}

export function generateBreadcrumbsSchemaLinks(
  links: BreadcrumbType[],
  locale: string | undefined,
  fullUrl: string | undefined,
  currentName: string | undefined
): BreadcrumbSchema[] {
  const breadcrumbs: BreadcrumbSchema[] = [];

  breadcrumbs.push({
    '@type': 'ListItem',
    position: 1,
    item: `${BASE_URL}/` + (locale && locale !== 'pl' ? locale + '/' : ''),
    name: 'Home',
  });

  links.forEach(({ url, name }, i) => {
    if (url && url !== '/') {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: i + 2,
        item: `${BASE_URL}${url}`,
        name: name || '',
      });
    }
  });

  if (fullUrl) {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: breadcrumbs.length + 1,
      item: fullUrl,
      name: currentName || 'Product',
    });
  }

  return breadcrumbs;
}