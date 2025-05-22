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
import { PageDataFullType, PageDataItemType } from '@/types/services';
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

      return {
        props: {
          pageTitle: pageData.title,
          pageContent: pageData.content,
          sections: pageData.sections,
          locale,
          slug,
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
}: PageProps) => {
  const isMainContent = isContentMain(pageContent, sections);
  const safeLocale = locale ?? 'pl';

  const fullText = getCleanText(pageContent);
  const pageDescription =
    fullText.slice(0, 160) ||
    `${pageTitle}: Learn more about Platinum by Chetvertinovskaya Liubov`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://platinumchetvertinovskaya.com/${safeLocale}/${slug}`,
        url: `https://platinumchetvertinovskaya.com/${safeLocale}/${slug}`,
        name: pageTitle,
        description: pageDescription,
        inLanguage:
          languageMap[safeLocale as keyof typeof languageMap] ?? 'pl-PL',
        isPartOf: {
          '@id': `https://platinumchetvertinovskaya.com/${safeLocale}/#website`,
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://platinumchetvertinovskaya.com/#organization',
        name: 'Platinum by Chetvertinovskaya Liubov',
        url: 'https://platinumchetvertinovskaya.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://platinumchetvertinovskaya.com/assets/icons/logo.png',
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
            item: `https://platinumchetvertinovskaya.com/${safeLocale}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pageTitle,
            item: `https://platinumchetvertinovskaya.com/${safeLocale}/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <meta name="description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <PageTitle title={pageTitle} />
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
