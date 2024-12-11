import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetCategoriesQuery } from '@/store/rtk-queries/wpCustomApi';
import { popupToggle } from '@/store/slices/PopupSlice';
import { Container, Title } from '@/styles/components';
import { SectionsType } from '@/types/components/sections';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { customRestApi } from '@/services/wpCustomApi';
import { validateWpPage } from '@/utils/zodValidators/validateWpPage';
import { PageDataFullType, PageDataItemType } from '@/types/services';

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
        console.error("Invalid data format:");
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
  const currency = useAppSelector((state) => state.currencySlice);
  const language = useAppSelector((state) => state.languageSlice);

  const dispatch = useAppDispatch();

  const { data: categoriesData } = useGetCategoriesQuery({});
  const { isMobile } = useResponsive();

  const categories = categoriesData?.data
    ? categoriesData?.data?.items.filter((category) => category.parent_id === 0)
    : [];

  const visibleCategoriesCount = isMobile ? 2 : 6;
  const displayedCategories = categories.slice(0, visibleCategoriesCount);

  return (
    <div className='homepage'>
      <SectionRenderer sections={sections} />
      <main>
        {/* <TestSelect /> */}
        <Container>
          <Title as='h2' fontSize={'20px'}>
            Symbol of {currency.code} currency isQQ {currency.symbol}
          </Title>
          <Title as='h2' fontSize={'20px'}>
            Symbol of {language.code} language isQQ {language.symbol}
          </Title>
          <button onClick={() => dispatch(popupToggle('categories-menu'))}>
            Categories
          </button>
        </Container>
      </main>
    </div>
  );
};

export default Home;
