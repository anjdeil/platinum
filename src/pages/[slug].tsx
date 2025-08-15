import { PageTitle } from '@/components/pages/pageTitle';
import { SlugPageBreadcrumbs } from '@/components/pages/slugPageBreadcrumbs';
import { RichTextSection } from '@/components/sections/RichTextSection';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { customRestApi } from '@/services/wpCustomApi';
import {
  Container,
  StyledHeaderWrapper,
  StyledSlugRichTextSection,
  Title,
} from '@/styles/components';
import { SectionsType } from '@/types/components/sections';
import {
  PageDataFullType,
  PageDataItemType,
  SeoDataType,
} from '@/types/services';
import { BASE_URL } from '@/utils/consts';
import { getCleanText } from '@/utils/getCleanText';
import { validateWpPage } from '@/utils/zodValidators/validateWpPage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';

const languageMap = {
  pl: 'pl-PL',
  en: 'en-US',
  de: 'de-DE',
  uk: 'uk-UA',
  ru: 'ru-RU',
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.params as { slug: string };
  const { locale } = context;

  try {
    const responseData = await customRestApi.get(`pages/${slug}`, {
      lang: locale,
    });

    if (!responseData || responseData.status !== 200) {
      return { notFound: true };
    }

    const isValidSectionsData = validateWpPage(responseData);
    if (!isValidSectionsData) throw new Error('Invalid SectionsData data');

    if (responseData && responseData.data) {
      const pageResponseData = responseData.data as PageDataFullType;
      const pageData = pageResponseData.data.item as PageDataItemType;

      if (!pageData) {
        return { notFound: true };
      }

      const safeLocale = locale ?? 'pl';
      const fullUrl =
        `${process.env.NEXT_PUBLIC_URL}/${safeLocale}/${slug}` || '';
      const seoData = (pageData?.seo_data as SeoDataType) || {};

      return {
        props: {
          pageTitle: pageData.title,
          pageContent: pageData?.seo_data?.description || pageData.content,
          sections: pageData.sections,
          locale,
          slug,
          fullUrl,
          seoData,
        },
      };
    }

    return { notFound: true };
  } catch (error) {
    console.error('Server Error:', error);
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

interface PageProps {
  pageTitle: string;
  pageContent: string;
  sections: SectionsType[];
  locale: string;
  slug: string;
  fullUrl?: string;
  seoData?: SeoDataType;
}

const isContentMain = (content: string, sections: any[]): boolean => {
  return content.length > 500 || sections.length === 0;
};

const SlugPage = ({
  pageTitle,
  pageContent,
  sections,
  locale,
  slug,
  fullUrl,
  seoData,
}: PageProps) => {
  const isMainContent = isContentMain(pageContent, sections);
  const safeLocale = locale ?? 'pl';

  const pageSeoTitle = seoData?.title || pageTitle;
  const fullText = getCleanText(pageContent);
  const pageDescription =
    fullText.slice(0, 160) ||
    `${pageTitle}: Learn more about Platinum by Chetvertinovskaya Liubov`;
  const pageImage =
    seoData?.og?.image_url || `${BASE_URL}/assets/icons/logo.png`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${safeLocale}/${slug}`,
        url: `${BASE_URL}/${safeLocale}/${slug}`,
        name: pageSeoTitle,
        description: pageDescription,
        inLanguage:
          languageMap[safeLocale as keyof typeof languageMap] ?? 'pl-PL',
        isPartOf: {
          '@id': `${BASE_URL}/${safeLocale}/#website`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Platinum by Chetvertinovskaya Liubov',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/assets/icons/logo.png`,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+48883462736',
            email: 'polandplatinum@gmail.com',
            contactType: 'customer service',
            areaServed: 'PL',
            availableLanguage: [
              'English',
              'German',
              'Polish',
              'Ukrainian',
              'Russian',
            ],
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kolejowa 45/U6',
          addressLocality: 'Warszawa',
          addressCountry: 'PL',
        },
        sameAs: [
          'https://www.facebook.com/share/18fGwAhvgr/?mibextid=wwXIfr',
          'https://www.instagram.com/platinum_poland',
          'https://pl.pinterest.com/PLATINUMbyChetvertinovskaya/',
          'https://www.youtube.com/channel/UCVCfpxqypwwUJX_wCZ8rjBw',
          'https://www.tiktok.com/@platinum_europe',
          'https://wa.me/48883462736',
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/${safeLocale}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pageTitle,
            item: `${BASE_URL}/${safeLocale}/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        <meta property="og:title" content={seoData?.og?.title || pageTitle} />
        <meta
          property="og:description"
          content={seoData?.og?.description || pageDescription}
        />
        <meta
          property="og:image"
          content={seoData?.og?.image_url || pageImage}
        />
        <link rel="canonical" href={fullUrl || ''} />
        <link rel="alternate" hrefLang={safeLocale} href={fullUrl} />
      </Head>
      <PageTitle title={pageSeoTitle} />
      <StyledHeaderWrapper>
        <SlugPageBreadcrumbs title={pageTitle} />
        <Title as={'h1'} uppercase>
          {pageTitle}
        </Title>
      </StyledHeaderWrapper>
      {isMainContent ? (
        <Container>
          <StyledSlugRichTextSection>
            <RichTextSection text={pageContent} fullSize={isMainContent} />
          </StyledSlugRichTextSection>
        </Container>
      ) : (
        <SectionRenderer sections={sections} />
      )}
    </>
  );
};

export default SlugPage;
