
import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import axios from "axios";
import { MenusContext } from "@/components/Layout";
import { useRegisterCustomerMutation } from "@/store/rtk-queries/wooCustomApi";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { Title } from "@/styles/components";

const inter = Inter({ subsets: ["latin"] });
import { popupToggle } from "@/store/slices/PopupSlice";

export default function Home()
{
  const [data, setData] = useState<null | any>(null);
  const currency = useAppSelector((state) => state.currencySlice);
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
      {/* <Title as='h2' fontSize={20}>Symbol of {currency.code} currency isQQ {currency.symbol}</Title> */}
      <button onClick={() => dispatch(popupToggle('categories-menu'))}>Categories</button>
    </main >
  )
}