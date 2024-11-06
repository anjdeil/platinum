
import { MenusContext } from "@/components/Layout";
import BlogListBlock from "@/components/pages/main/BlogListBlock/BlogListBlock";
import { useAppDispatch, useAppSelector } from "@/store";
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
  return (
    <main>
      {/* <TestSelect /> */}
      <Container>
        <Title as='h2' fontSize={"20px"}>Symbol of {currency.code} currency isQQ {currency.symbol}</Title>
        <Title as='h2' fontSize={"20px"}>Symbol of {language.code} language isQQ {language.symbol}</Title>
        <button onClick={() => dispatch(popupToggle('categories-menu'))}>Categories</button>
        <BlogListBlock posts={temporaryPosts} />
      </Container>
    </main >
  )
}

const temporaryPosts = [
  {
    id: 1,
    slug: "blog-1",
    status: '',
    type: '',
    title: "Do extensions damage natural eyelashes?",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam consequuntur dolorum voluptates, voluptate dolorem possimus expedita quidem cum corporis repellat? Eligendi, veniam! Ad sapiente similique dignissimos aliquam dicta iure facilis deserunt totam, doloribus modi neque. At natus consectetur suscipit eaque culpa impedit excepturi architecto est esse aut veniam error maiores quia fugit, itaque eum pariatur nihil quaerat quis, atque quasi laboriosam. A fugit, vel quo corporis ipsa asperiores illo quos optio obcaecati voluptatibus commodi error minus, delectus in nobis expedita tempore ipsam voluptatum sit. Quasi amet nostrum modi, et, officiis veniam adipisci neque fuga, illum alias commodi doloremque velit.",
    excerpt: "In recent years, hair extension treatment has become part of the beauty routine of many women..",
    created: "2024-11-06T10:13:13.624Z",
    modified: "2024-11-06T10:13:13.624Z",
    thumbnail: "/assets/images/postImage.png"
  },
  {
    id: 2,
    slug: "blog-2",
    status: '',
    type: '',
    title: "Do extensions damage natural eyelashes?",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam consequuntur dolorum voluptates, voluptate dolorem possimus expedita quidem cum corporis repellat? Eligendi, veniam! Ad sapiente similique dignissimos aliquam dicta iure facilis deserunt totam, doloribus modi neque. At natus consectetur suscipit eaque culpa impedit excepturi architecto est esse aut veniam error maiores quia fugit, itaque eum pariatur nihil quaerat quis, atque quasi laboriosam. A fugit, vel quo corporis ipsa asperiores illo quos optio obcaecati voluptatibus commodi error minus, delectus in nobis expedita tempore ipsam voluptatum sit. Quasi amet nostrum modi, et, officiis veniam adipisci neque fuga, illum alias commodi doloremque velit.",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dignissimos libero sint, iste quae consectetur architecto modi qui iure recusandae!",
    created: "2024-11-06T10:13:13.624Z",
    modified: "2024-11-06T10:13:13.624Z",
    thumbnail: "/assets/images/postImage.png"
  },
  {
    id: 3,
    slug: "blog-3",
    status: '',
    type: '',
    title: "Do extensions damage natural eyelashes?",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam consequuntur dolorum voluptates, voluptate dolorem possimus expedita quidem cum corporis repellat? Eligendi, veniam! Ad sapiente similique dignissimos aliquam dicta iure facilis deserunt totam, doloribus modi neque. At natus consectetur suscipit eaque culpa impedit excepturi architecto est esse aut veniam error maiores quia fugit, itaque eum pariatur nihil quaerat quis, atque quasi laboriosam. A fugit, vel quo corporis ipsa asperiores illo quos optio obcaecati voluptatibus commodi error minus, delectus in nobis expedita tempore ipsam voluptatum sit. Quasi amet nostrum modi, et, officiis veniam adipisci neque fuga, illum alias commodi doloremque velit.",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dignissimos libero sint, iste quae consectetur architecto modi qui iure recusandae!",
    created: "2024-11-06T10:13:13.624Z",
    modified: "2024-11-06T10:13:13.624Z",
    thumbnail: "/assets/images/postImage.png"
  },
  {
    id: 4,
    slug: "blog-4",
    status: '',
    type: '',
    title: "Do extensions damage natural eyelashes?",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam consequuntur dolorum voluptates, voluptate dolorem possimus expedita quidem cum corporis repellat? Eligendi, veniam! Ad sapiente similique dignissimos aliquam dicta iure facilis deserunt totam, doloribus modi neque. At natus consectetur suscipit eaque culpa impedit excepturi architecto est esse aut veniam error maiores quia fugit, itaque eum pariatur nihil quaerat quis, atque quasi laboriosam. A fugit, vel quo corporis ipsa asperiores illo quos optio obcaecati voluptatibus commodi error minus, delectus in nobis expedita tempore ipsam voluptatum sit. Quasi amet nostrum modi, et, officiis veniam adipisci neque fuga, illum alias commodi doloremque velit.",
    excerpt: "In recent years, hair extension treatment has become part of the beauty routine of many women..",
    created: "2024-11-06T10:13:13.624Z",
    modified: "2024-11-06T10:13:13.624Z",
    thumbnail: "/assets/images/postImage.png"
  }
]