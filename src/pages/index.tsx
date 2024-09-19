import { MenusContext } from "@/components/Layout";
import { useAppDispatch, useAppSelector } from "@/store";
import { popupToggle } from "@/store/slices/PopupSlice";
import axios from "axios";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home()
{
  const [data, setData] = useState<null | any>(null);
  const currency = useAppSelector((state) => state.currentCurrency);
  const menus = useContext(MenusContext);
  const dispatch = useAppDispatch();

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
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      {/* <TestSelect /> */}
      {/* <Title fontSize={24}>Symbol of {currency.code} currency is {currency.symbol}</Title> */}
      <button onClick={() => dispatch(popupToggle('mobile-categories'))}>Fetch</button>
    </main >
  )
}