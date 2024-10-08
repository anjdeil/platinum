import { Title } from "@/styles/components";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MenusContext } from "@/components/Layout";
import { useAppSelector } from "@/store";
import { useRouter } from "next/router";
import { useRegisterCustomerMutation } from "@/store/rtk-queries/wooCustomApi";
import { RegistrationForm } from "@/components/Global/forms/RegistrationForm";

const inter = Inter({ subsets: ["latin"] });

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

  const [registerUser, { data: registerResponse, error }] = useRegisterCustomerMutation();

  { data && <p>{data}</p> }
  return (
    <main>
      <Title fontSize={24}>Symbol of {currency.code} currency is {currency.symbol}</Title>
      <button onClick={() => console.log('')}>Fetch</button>
      <RegistrationForm />
    </main >
  )
}