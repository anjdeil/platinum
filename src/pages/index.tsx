import { Title } from "@/styles/components";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import axios from "axios";
import { useGetMenusQuery } from "@/store/rtk-queries/wpCustomApi";
import { MenusContext } from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home()
{
  const [data, setData] = useState<null | any>(null);
  const menus = useContext(MenusContext);

  console.log(menus);

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
      <Title fontSize={24}>Title</Title>
      <button onClick={() => check()}>Fetch</button>
    </main >
  )
}