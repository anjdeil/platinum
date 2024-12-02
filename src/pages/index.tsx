import { MenusContext } from '@/components/Layout';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetCategoriesQuery } from '@/store/rtk-queries/wpCustomApi';
import { popupToggle } from '@/store/slices/PopupSlice';
import { Container, Title } from '@/styles/components';
import { SectionsType } from '@/types/components/sections';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Inter } from 'next/font/google';
import { useContext, useState } from 'react';
import { customRestApi } from '@/services/wpCustomApi';
import { validateWpHomePage } from '@/utils/zodValidators/validateWpHomePage';
import { HomePageType } from '@/types/pages';
import BlogListBlock from "@/components/pages/main/BlogListBlock/BlogListBlock";

const inter = Inter({ subsets: ['latin'] });

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

const temporaryPosts = [
  {
    id: 1,
    slug: "blog-1",
    status: '',
    type: '',
    title: "Do extensions damage natural eyelashes?",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam consequuntur dolorum voluptates, voluptate dolorem possimus expedita quidem cum corporis repellat? Eligendi, veniam! Ad sapiente similique dignissimos aliquam dicta iure facilis deserunt totam, doloribus modi neque. At natus consectetur suscipit eaque culpa impedit excepturi architecto est esse aut veniam error maiores quia fugit, itaque eum pariatur nihil quaerat quis, atque quasi laboriosam. A fugit, vel quo corporis ipsa asperiores illo quos optio obcaecati voluptatibus commodi error minus, delectus in nobis expedita tempore ipsam voluptatum sit. Quasi amet nostrum modi, et, officiis veniam adipisci neque fuga, illum alias commodi doloremque velit.",
    excerpt: "In recent years, hair extension treatment has become part of the beauty routine of many women..",
    created: "2024-11-06T10:13:13.624Z",
    modified: "2024-11-06T10:13:13.624Z",
    thumbnail: "/assets/images/postImage.png"
  },
  {
    id: 2,
    slug: "blog-2",
    status: '',
    type: '',
    title: "Do extensions damage natural eyelashes?",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam consequuntur dolorum voluptates, voluptate dolorem possimus expedita quidem cum corporis repellat? Eligendi, veniam! Ad sapiente similique dignissimos aliquam dicta iure facilis deserunt totam, doloribus modi neque. At natus consectetur suscipit eaque culpa impedit excepturi architecto est esse aut veniam error maiores quia fugit, itaque eum pariatur nihil quaerat quis, atque quasi laboriosam. A fugit, vel quo corporis ipsa asperiores illo quos optio obcaecati voluptatibus commodi error minus, delectus in nobis expedita tempore ipsam voluptatum sit. Quasi amet nostrum modi, et, officiis veniam adipisci neque fuga, illum alias commodi doloremque velit.",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dignissimos libero sint, iste quae consectetur architecto modi qui iure recusandae!",
    created: "2024-11-06T10:13:13.624Z",
    modified: "2024-11-06T10:13:13.624Z",
    thumbnail: "/assets/images/postImage.png"
  },
  {
    id: 3,
    slug: "blog-3",
    status: '',
    type: '',
    title: "Do extensions damage natural eyelashes?",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam consequuntur dolorum voluptates, voluptate dolorem possimus expedita quidem cum corporis repellat? Eligendi, veniam! Ad sapiente similique dignissimos aliquam dicta iure facilis deserunt totam, doloribus modi neque. At natus consectetur suscipit eaque culpa impedit excepturi architecto est esse aut veniam error maiores quia fugit, itaque eum pariatur nihil quaerat quis, atque quasi laboriosam. A fugit, vel quo corporis ipsa asperiores illo quos optio obcaecati voluptatibus commodi error minus, delectus in nobis expedita tempore ipsam voluptatum sit. Quasi amet nostrum modi, et, officiis veniam adipisci neque fuga, illum alias commodi doloremque velit.",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dignissimos libero sint, iste quae consectetur architecto modi qui iure recusandae!",
    created: "2024-11-06T10:13:13.624Z",
    modified: "2024-11-06T10:13:13.624Z",
    thumbnail: "/assets/images/postImage.png"
  },
  {
    id: 4,
    slug: "blog-4",
    status: '',
    type: '',
    title: "Do extensions damage natural eyelashes?",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam consequuntur dolorum voluptates, voluptate dolorem possimus expedita quidem cum corporis repellat? Eligendi, veniam! Ad sapiente similique dignissimos aliquam dicta iure facilis deserunt totam, doloribus modi neque. At natus consectetur suscipit eaque culpa impedit excepturi architecto est esse aut veniam error maiores quia fugit, itaque eum pariatur nihil quaerat quis, atque quasi laboriosam. A fugit, vel quo corporis ipsa asperiores illo quos optio obcaecati voluptatibus commodi error minus, delectus in nobis expedita tempore ipsam voluptatum sit. Quasi amet nostrum modi, et, officiis veniam adipisci neque fuga, illum alias commodi doloremque velit.",
    excerpt: "In recent years, hair extension treatment has become part of the beauty routine of many women..",
    created: "2024-11-06T10:13:13.624Z",
    modified: "2024-11-06T10:13:13.624Z",
    thumbnail: "/assets/images/postImage.png"
  }
];

interface HomeProps {
  sections: SectionsType[];
}

const Home: React.FC<HomeProps> = ({ sections }) => {
  const [data, setData] = useState<null | any>(null);
  const currency = useAppSelector((state) => state.currencySlice);
  const language = useAppSelector((state) => state.languageSlice);
  const menus = useContext(MenusContext);

  async function check() {
    const res = await axios.get('/api/wp/users');
    if (res.status === 200) {
      setData(res.data);
    } else {
      console.error(res);
    }
  }

  const dispatch = useAppDispatch();
  const popup = useAppSelector((state) => state.popup);

  {
    data && <p>{data}</p>;
  }

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
          <BlogListBlock posts={temporaryPosts} />
        </Container>
      </main>
    </div>
  );
};

export default Home;
