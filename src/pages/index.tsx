import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { customRestApi } from '@/services/wpCustomApi';
import { SectionsType } from '@/types/components/sections';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { validateWpPage } from '@/utils/zodValidators/validateWpPage';
import { PageDataFullType, PageDataItemType } from '@/types/services';
import InfoPopup from '@/components/global/popups/InfoPopup/InfoPopup';

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

      return {
        props: {
          sections: filteredSections,
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
}

const Home: React.FC<HomeProps> = ({ sections }) => {
  return (
    <div className="homepage">
      <SectionRenderer sections={sections} />
      <InfoPopup />
    </div>
  );
};

export default Home;
