import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { customRestApi } from '@/services/wpCustomApi';
import { SectionsType } from '@/types/components/sections';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { validateWpPage } from '@/utils/zodValidators/validateWpPage';
import {
  PageDataFullType,
  PageDataItemType,
  SeoDataType,
} from '@/types/services';
import InfoPopup from '@/components/global/popups/InfoPopup/InfoPopup';
import { PageTitle } from '@/components/pages/pageTitle';
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
  const { locale } = context;

  try {
    const responseData = await customRestApi.get(`pages/homepage`, {
      lang: locale,
    });

    if (!responseData || responseData.status !== 200) {
      return { notFound: true };
    }

    if (responseData) {
      const isValidSectionsData = validateWpPage(responseData);
      if (!isValidSectionsData) {
        console.error('Invalid data format:');
      }
    }

    if (responseData && responseData.data) {
      const pageResponseData = responseData.data as PageDataFullType;
      const pageData = pageResponseData.data.item as PageDataItemType;

      if (!pageData) {
        return { notFound: true };
      }

      const filteredSections = pageData.sections.filter(
        (section: { _type: string }) =>
          [
            'slider',
            'product_list',
            'categories',
            'instagram',
            'reviews',
            'newsletter',
            'about_platinum',
            'features',
            'blog',
          ].includes(section._type)
      );

      const safeLocale = locale ?? 'pl';
      const baseDomain = process.env.NEXT_PUBLIC_URL;
      const fullUrl =
        safeLocale === 'pl'
          ? `${baseDomain}/`
          : `${baseDomain}/${safeLocale}/` || '';

      return {
        props: {
          sections: filteredSections,
          locale,
          seoData: pageData.seo_data || {},
          fullUrl,
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

interface HomeProps {
  sections: SectionsType[];
  locale: string;
  seoData?: SeoDataType;
  fullUrl?: string;
}

const Home: React.FC<HomeProps> = ({ sections, locale, seoData, fullUrl }) => {
  // SEO Data
  const canonicalUrl = fullUrl || 'https://platinumchetvertinovskaya.com/';
  const pageTitle = seoData?.title || 'Platinum by Chetvertinovskaya Liubov';
  const pageDescription =
    seoData?.description ||
    'European Brand for Professionals PLATINUM by Chetvertinovskaya Liubov supports stylists in creating perfect eyelash and eyebrow designs.';
  const pageImage =
    seoData?.images?.[0] ||
    'https://platinumchetvertinovskaya.com/assets/icons/logo.png';
  const safeLocale = locale ?? 'pl';
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `https://platinumchetvertinovskaya.com/#website`,
        url: `https://platinumchetvertinovskaya.com/${safeLocale}/`,
        name: pageTitle,
        inLanguage:
          languageMap[safeLocale as keyof typeof languageMap] ?? 'pl-PL',
        potentialAction: {
          '@type': 'SearchAction',
          target: `https://platinumchetvertinovskaya.com/${safeLocale}/search/{search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://platinumchetvertinovskaya.com/#organization',
        name: pageTitle,
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
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang={safeLocale} href={canonicalUrl} />
      </Head>
      <PageTitle title={pageTitle} />
      <div className="homepage">
        <SectionRenderer sections={sections} />
        <InfoPopup />
      </div>
    </>
  );
};

export default Home;
