
import BannerSlider from "@/components/global/sliders/BannerSlider/BannerSlider";
import { MenusContext } from "@/components/Layout";
import { useAppDispatch, useAppSelector } from "@/store";
import { popupToggle } from "@/store/slices/PopupSlice";
import { Title } from "@/styles/components";
import { BannerSlideType } from "@/types/components/global/sliders/BannerSlider";
import axios from "axios";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home()
{
  const [data, setData] = useState<null | any>(null);
  const currency = useAppSelector((state) => state.currencySlice);
  const language = useAppSelector((state) => state.languageSlice);
  const menus = useContext(MenusContext);

  async function check()
  {
    const res = await axios.get('/api/wp/users');
    if (res.status === 200)
    {
      setData(res.data);
    } else
    {
      console.error(res);
    }
  }

  const dispatch = useAppDispatch();
  const popup = useAppSelector(state => state.popup);

  { data && <p>{data}</p> }
  return (
    <main>
      {/* <TestSelect /> */}
      <Title as='h2' fontSize={"20px"}>Symbol of {currency.code} currency isQQ {currency.symbol}</Title>
      <Title as='h2' fontSize={"20px"}>Symbol of {language.code} language isQQ {language.symbol}</Title>
      <button onClick={() => dispatch(popupToggle('categories-menu'))}>Categories</button>
      <BannerSlider slides={slides} proportion={5} />
      <Title as='h2' fontSize={"20px"}>Symbol of {currency.code} currency isQQ {currency.symbol}</Title>
      <Title as='h2' fontSize={"20px"}>Symbol of {language.code} language isQQ {language.symbol}</Title>
      
    </main >
  )
}

const slides: BannerSlideType[] = [
  {
    product: {
      id: 1,
      sku: "SKU123",
      slug: "product-1",
      name: "Product 1",
      description: "Description of product 1",
      type: "simple",
      created: "2023-01-01T00:00:00Z",
      modified: "2023-01-02T00:00:00Z",
      language_code: "en",
      stock_quantity: 10,
      min_price: 100,
      max_price: 150,
      categories: [
        {
          id: 1,
          parent_id: 0,
          slug: "category-1",
          name: "Category 1",
          description: "Description of Category 1",
          count: 10
        }
      ],
      images: [
        {
          id: 1,
          src: "https://example.com/image1.jpg",
          name: "Image 1"
        }
      ],
      attributes: [],
      default_attributes: [],
      variations: []
    },
    image: "bannerDesktop.png",
    mobileImage: "bannerMobile.png"
  },
  {
    product: {
      id: 2,
      sku: null,
      slug: "product-2",
      name: "Product 2",
      description: "Description of product 2",
      type: "variable",
      created: "2023-02-01T00:00:00Z",
      modified: "2023-02-02T00:00:00Z",
      language_code: "en",
      stock_quantity: 5,
      min_price: 200,
      max_price: 300,
      categories: [
        {
          id: 2,
          parent_id: 1,
          slug: "category-2",
          name: "Category 2",
          description: "Description of Category 2",
          count: 5
        }
      ],
      images: [
        {
          id: 2,
          src: "https://example.com/image2.jpg",
          name: "Image 2"
        }
      ],
      attributes: [],
      default_attributes: [],
      variations: []
    },
    image: "bannerDesktop.png",
    mobileImage: "bannerMobile.png"
  },
  {
    product: {
      id: 3,
      sku: null,
      slug: "product-2",
      name: "Product 2",
      description: "Description of product 2",
      type: "variable",
      created: "2023-02-01T00:00:00Z",
      modified: "2023-02-02T00:00:00Z",
      language_code: "en",
      stock_quantity: 5,
      min_price: 200,
      max_price: 300,
      categories: [
        {
          id: 2,
          parent_id: 1,
          slug: "category-2",
          name: "Category 2",
          description: "Description of Category 2",
          count: 5
        }
      ],
      images: [
        {
          id: 2,
          src: "https://example.com/image2.jpg",
          name: "Image 2"
        }
      ],
      attributes: [],
      default_attributes: [],
      variations: []
    },
    image: "bannerDesktop.png",
    mobileImage: "bannerMobile.png"
  }
]; 