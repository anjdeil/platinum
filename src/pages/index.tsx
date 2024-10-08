import { MenusContext } from "@/components/Layout";
import { useAppSelector } from "@/store";
import { Title } from "@/styles/components";
import axios from "axios";
import { useContext, useState } from "react";

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
    <main>
      {/* <TestSelect /> */}
      <Title as='h2' fontSize="20px">Symbol of {currency.code} currency isQQ {currency.symbol}</Title>
      <button onClick={() => check()}>Fetch</button>
    </main >
  )
}