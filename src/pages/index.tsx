
import { MenusContext } from "@/components/Layout";
import CategoriesBlock from "@/components/pages/main/CategoriesBlock/CategoriesBlock";
import { useResponsive } from "@/hooks/useResponsive";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import { popupToggle } from "@/store/slices/PopupSlice";
import { Container, Title } from "@/styles/components";
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

  const { data: categoriesData } = useGetCategoriesQuery({});
  const { isMobile } = useResponsive();

  const categories = categoriesData?.data
    ? categoriesData?.data?.items.filter(category => category.parent_id === 0)
    : [];

  const visibleCategoriesCount = isMobile ? 2 : 6;
  const displayedCategories = categories.slice(0, visibleCategoriesCount);

  return (
    <main>
      {/* <TestSelect /> */}
      <Container>
        <Title as='h2' fontSize={"20px"}>Symbol of {currency.code} currency isQQ {currency.symbol}</Title>
        <Title as='h2' fontSize={"20px"}>Symbol of {language.code} language isQQ {language.symbol}</Title>
        <button onClick={() => dispatch(popupToggle('categories-menu'))}>Categories</button>
        <CategoriesBlock categories={displayedCategories} />
      </Container>
      <Title as='h2' fontSize={"20px"}>Symbol of {currency.code} currency isQQ {currency.symbol}</Title>
      <Title as='h2' fontSize={"20px"}>Symbol of {language.code} language isQQ {language.symbol}</Title>
      <button onClick={() => dispatch(popupToggle('categories-menu'))}>Categories</button>
    </main >
  )
}