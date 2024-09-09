import { MenusContext } from "@/components/Layout";
import { useAppSelector } from "@/store";
import { Title } from "@/styles/components";
import axios from "axios";
import { Montserrat } from "next/font/google";
import { useContext, useState } from "react";


const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"] });

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
    <main className={montserrat.className}>
      {/* <TestSelect /> */}
      <Title fontSize={24}>Symbol of {currency.code} currency is {currency.symbol}</Title>
      <button onClick={() => check()}>Fetch</button>
    </main >
  )
}