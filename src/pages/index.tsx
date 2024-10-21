
import { LoginForm } from "@/components/global/forms/LoginForm";
import { MenusContext } from "@/components/Layout";
import { useAppDispatch, useAppSelector } from "@/store";
import { popupToggle } from "@/store/slices/PopupSlice";
import { Title } from "@/styles/components";
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
      <LoginForm />
    </main >
  )
}