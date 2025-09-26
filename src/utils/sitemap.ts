import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import getDomainFromUrl from './getDomainFromUrl';

// WordPress and Next.js domains
const WP_ADMIN_DOMAIN = getDomainFromUrl(
  process.env.NEXT_PUBLIC_WP_URL || 'admin.example.com'
);
const NEXT_DOMAIN = getDomainFromUrl(
  process.env.NEXT_PUBLIC_URL || 'example.vercel.com'
);

// Configuration for XML parser and builder
const parserOptions = {
  ignoreAttributes: false,
  parseTagValue: false,
  parseAttributeValue: false,
  cdataPropName: '__cdata',
  attributeNamePrefix: '@_',
  isArray: (name: string) => ['sitemap', 'url', 'image:image'].includes(name),
};

const builderOptions = {
  ignoreAttributes: false,
  format: true,
  cdataPropName: '__cdata',
  attributeNamePrefix: '@_',
};

/**
 * Transform the root sitemap by replacing WordPress child sitemap URLs with Next.js child sitemap URLs
 */
export async function rewriteChildSitemapUrls(
  xmlContent: string
): Promise<string> {
  const parser = new XMLParser(parserOptions);
  const builder = new XMLBuilder(builderOptions);

  const parsed = parser.parse(xmlContent);

  // Transform each sitemap entry
  if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
    parsed.sitemapindex.sitemap.forEach((sitemap: any) => {
      if (sitemap.loc && sitemap.loc.__cdata) {
        const originalUrl = sitemap.loc.__cdata;
        // Extract the sitemap filename from the URL
        const sitemapFilename = originalUrl.split('/').pop();

        // Replace with Next.js URL
        sitemap.loc.__cdata = `https://${NEXT_DOMAIN}/sitemap/${sitemapFilename}`;
      }
    });
  }

  // The browser blocks loading XSL from another domain (CORS).
  let xml = builder.build(parsed);
  xml = xml.replace(/<\?xml-stylesheet [^>]*\?>/i, '');

  return xml;
}

/**
 * Transform a WPML addl sitemap by replacing all WordPress URLs with Next.js URLs
 */
export async function rewriteDomainInAddlSitemap(
  xmlContent: string
): Promise<string> {
  const parser = new XMLParser(parserOptions);
  const builder = new XMLBuilder(builderOptions);

  const parsed = parser.parse(xmlContent);

  const replace = (url: string) => {
    if (typeof url === 'string') {
      return url.replace(
        `https://${WP_ADMIN_DOMAIN}`,
        `https://${NEXT_DOMAIN}`
      );
    } else {
      return url;
    }
  };

  // Transform each URL entry
  if (parsed.urlset && parsed.urlset.url) {
    parsed.urlset.url.forEach((url: any) => {
      // Replace main URL
      if (url.loc && url.loc.__cdata) {
        url.loc.__cdata = replace(url.loc.__cdata);
      }

      // replace xhtml:link href urls
      if (url['xhtml:link'] && Array.isArray(url['xhtml:link'])) {
        url['xhtml:link'].forEach(link => {
          link['@_href'] = replace(link['@_href']);

          if(link['@_hreflang'] === 'pl') {
            link['@_href'] = link['@_href'].replace('/pl/','/');
          }
        });
      }
    });
  }

  // The browser blocks loading XSL from another domain (CORS).
  let xml = builder.build(parsed);
  xml = xml.replace(/<\?xml-stylesheet [^>]*\?>/i, '');

  return xml;
}

/**
 * Fetch XML content from WordPress
 */
export async function fetchSitemap(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/xml',
      },
    });

    if (response.status === 404) {
      throw new Error('Requested resource not found.');
    } else if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    throw error;
  }
}

/**
 * Cache control headers for sitemaps
 */
export const SITEMAP_CACHE_HEADERS = {
  'Cache-Control':
    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  'Content-Type': 'application/xml',
};
