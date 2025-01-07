import SideList from "@/components/global/SideList/SideList";
import { AccountTitle } from "@/styles/components";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { AccountContainer, AccountContent, SideListContainer } from "./styles";
import accountLinks from "./accountLinks";

export default function AccountLayout({ title, children }: { title: string; children: ReactNode }) {
  const t = useTranslations("MyAccount");
  const router = useRouter();
  const activeLink = router.pathname;

  const translatedAccountLinks = accountLinks.map(({ name, ...props }) => ({
    name: t(name),
    ...props,
  }));

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AccountTitle as={"h1"} textalign="center" uppercase>
        {title}
      </AccountTitle>
      <AccountContainer>
        <SideListContainer>
          <SideList links={translatedAccountLinks} activeLink={activeLink} borderRadius="10px" />
        </SideListContainer>
        <AccountContent>{children}</AccountContent>
      </AccountContainer>
    </>
  );
}
