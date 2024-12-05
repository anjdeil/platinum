import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { useResponsive } from '@/hooks/useResponsive';
import { customRestApi } from '@/services/wpCustomApi';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetCategoriesQuery } from '@/store/rtk-queries/wpCustomApi';
import { popupToggle } from '@/store/slices/PopupSlice';
import { Container, Title } from '@/styles/components';
import { SectionsType } from '@/types/components/sections';
import { HomePageType } from '@/types/pages';
import { validateWpHomePage } from '@/utils/zodValidators/validateWpHomePage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  const sectionsResponse = await customRestApi.get(`pages/homepage`, {
    lang: locale,
  });
  const sectionsData = sectionsResponse.data as HomePageType;

  const isValidSectionsData = validateWpHomePage(sectionsData);
  if (!isValidSectionsData) throw new Error('Invalid SectionsData data');

  const filteredSections = sectionsData.data.item.sections.filter(
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
            Symbol of {currency.name} currency isQQ {currency.code}
          </Title>
          <Title as='h2' fontSize={'20px'}>
            Symbol of {language.name} language isQQ {language.code}
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
