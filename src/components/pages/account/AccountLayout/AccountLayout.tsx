import { CustomSingleAccordion } from '@/components/global/accordions/CustomSingleAccordion';
import SideList from '@/components/global/SideList/SideList';
import { useResponsive } from '@/hooks/useResponsive';
import { AccountTitle } from '@/styles/components';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import accountLinks from './accountLinks';
import { AccountContainer, AccountContent, SideListContainer } from './styles';

export default function AccountLayout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const t = useTranslations('MyAccount');
  const router = useRouter();
  const activeLink = router.pathname;
  const { isMobile } = useResponsive();

  const translatedAccountLinks = accountLinks.map(({ name, ...props }) => ({
    name: t(name),
    ...props,
  }));

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {title && (
        <AccountTitle as={'h1'} textalign="center" uppercase marginTop="24">
          {title}
        </AccountTitle>
      )}
      <AccountContainer>
        <SideListContainer>
          {isMobile ? (
            <CustomSingleAccordion
              title={t('customerPanel')}
              detailsPadding="16px 0 0"
            >
              <SideList
                links={translatedAccountLinks}
                activeLink={activeLink}
                borderRadius="10px"
              />
            </CustomSingleAccordion>
          ) : (
            <SideList
              links={translatedAccountLinks}
              activeLink={activeLink}
              borderRadius="10px"
            />
          )}
        </SideListContainer>
        <AccountContent>{children}</AccountContent>
      </AccountContainer>
    </>
  );
}
