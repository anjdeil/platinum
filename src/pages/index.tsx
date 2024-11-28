import BannerSlider from '@/components/global/sliders/BannerSlider/BannerSlider';
import { MenusContext } from '@/components/Layout';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import CustomProductList from '@/components/pages/product/CustomProductList/CustomProductList';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetCategoriesQuery } from '@/store/rtk-queries/wpCustomApi';
import { popupToggle } from '@/store/slices/PopupSlice';
import { Container, Title } from '@/styles/components';
import { SectionsType } from '@/types/components/sections';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import { useContext, useState } from 'react';
import { BannerSlideType } from '@/types/components/global/sliders/BannerSlider';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  sections: SectionsType[];
}

export default function Home({ sections }: HomeProps) {
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
          <BannerSlider slides={slides} proportion={5.1} />
          <CustomProductList title='bestSeller' productIds={Bestsellers} />
          <CustomProductList title='newProduct' productIds={Bestsellers} />
        </Container>
      </main>
    </div>
  );
}

const Bestsellers = [24707, 24777, 24737, 24717];

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://185.65.246.4/api/v1/pages/homepage');
  const data = await res.json();

  const filteredSections = data.data.item.sections.filter(
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

const slides: BannerSlideType[] = [
//   {
//     product: {
//       id: 3,
//       sku: 'SKU456',
//       slug: 'product-3',
//       name: 'Product 3',
//       description: 'Description of product 3',
//       type: 'simple',
//       created: '2023-03-01T00:00:00Z',
//       modified: '2023-03-02T00:00:00Z',
//       language_code: 'en',
//       stock_quantity: null,
//       min_price: 500,
//       max_price: 600,
//       average_rating: 4.8,
//       categories: [
//         {
//           id: 3,
//           parent_id: 0,
//           slug: 'category-3',
//           name: 'Category 3',
//           description: 'Description of Category 3',
//           count: 8,
//         },
//       ],
//       thumbnail: {
//         id: 103,
//         src: 'https://example.com/thumbnail3.jpg',
//         name: 'Thumbnail 3',
//       },
//       images: [
//         {
//           id: 3,
//           src: 'https://example.com/image3.jpg',
//           name: 'Image 3',
//         },
//       ],
//       attributes: [],
//       default_attributes: [],
//       variations: [],
//     },
//     image: 'bannerDesktop.png',
//     mobileImage: 'bannerMobile.png',
//   },
//   {
//     product: {
//       id: 2,
//       sku: null,
//       slug: 'product-2',
//       name: 'Product 2',
//       description: 'Description of product 2',
//       type: 'variable',
//       created: '2023-02-01T00:00:00Z',
//       modified: '2023-02-02T00:00:00Z',
//       language_code: 'en',
//       stock_quantity: 5,
//       min_price: 200,
//       max_price: 300,
//       average_rating: 4.0,
//       categories: [
//         {
//           id: 2,
//           parent_id: 1,
//           slug: 'category-2',
//           name: 'Category 2',
//           description: 'Description of Category 2',
//           count: 5,
//         },
//       ],
//       thumbnail: undefined,
//       images: [
//         {
//           id: 2,
//           src: 'https://example.com/image2.jpg',
//           name: 'Image 2',
//         },
//       ],
//       attributes: [],
//       default_attributes: [],
//       variations: [],
//     },
//     image: 'bannerDesktop.png',
//     mobileImage: 'bannerMobile.png',
//   },
//   {
//     product: {
//       id: 1,
//       sku: 'SKU123',
//       slug: 'product-1',
//       name: 'Product 1',
//       description: 'Description of product 1',
//       type: 'simple',
//       created: '2023-01-01T00:00:00Z',
//       modified: '2023-01-02T00:00:00Z',
//       language_code: 'en',
//       stock_quantity: 10,
//       min_price: 100,
//       max_price: 150,
//       average_rating: 4.5,
//       categories: [
//         {
//           id: 1,
//           parent_id: 0,
//           slug: 'category-1',
//           name: 'Category 1',
//           description: 'Description of Category 1',
//           count: 10,
//         },
//       ],
//       thumbnail: {
//         id: 101,
//         src: 'https://example.com/thumbnail1.jpg',
//         name: 'Thumbnail 1',
//       },
//       images: [
//         {
//           id: 1,
//           src: 'https://example.com/image1.jpg',
//           name: 'Image 1',
//         },
//       ],
//       attributes: [],
//       default_attributes: [],
//       variations: [],
//     },
//     image: 'bannerDesktop.png',
//     mobileImage: 'bannerMobile.png',
//   },
// ];
