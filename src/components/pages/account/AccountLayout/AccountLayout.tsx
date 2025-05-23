import { CustomSingleAccordion } from '@/components/global/accordions/CustomSingleAccordion';
import SideList from '@/components/global/SideList/SideList';
import { useResponsive } from '@/hooks/useResponsive';
import { AccountTitle } from '@/styles/components';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import accountLinks from './accountLinks';
import { AccountContainer, AccountContent, SideListContainer } from './styles';
import { PageTitle } from '../../pageTitle';
import Head from 'next/head';

export default function AccountLayout({
  title,
  nameSpace,
  spaceKey,
  subTitle,
  children,
}: {
  title?: string;
  nameSpace?: string;
  spaceKey?: string;
  subTitle?: string;
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
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <PageTitle
        title={subTitle ? subTitle : title}
        nameSpace={nameSpace}
        spaceKey={spaceKey}
      />
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
