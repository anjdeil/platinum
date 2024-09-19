import ProductCard from "@/components/Common/Product/ProductCard/ProductCard";
import SortSelect from "@/components/Common/SortSelect/SortSelect";
import { MenusContext } from "@/components/Layout";
import { useAppSelector } from "@/store";
import { TitleCatalog } from "@/styles/components";
import styled from "@emotion/styled";
import axios from "axios";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  padding: 16px;

  @media ${({ theme }) => theme.media.medium} {
      grid-template-columns: repeat(12, 1fr);
  }
`;

export default function Home()
{
  const [data, setData] = useState<null | any>(null);
  const currency = useAppSelector((state) => state.currentCurrency);
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

  { data && <p>{data}</p> }
  return (
    <main className={`grid min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      {/* <TestSelect /> */}
      <TitleCatalog>Colored eyelashes</TitleCatalog>
      <SortSelect />
      <ProductGrid>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ProductGrid>
      <button onClick={() => check()}>Fetch</button>
    </main >
  )
}