import { Container, FormPageWrapper } from '@/styles/components';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { NewPasswordForm } from '@/components/global/forms/password/NewPasswordForm';
import { GetServerSidePropsContext } from 'next';
import { PageTitle } from '@/components/pages/pageTitle';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ResetPassword() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');
  const { locale } = useRouter();

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: `/${locale}` },
    { name: tBreadcrumbs('myAccount'), url: `/${locale}/my-account` },
    { name: t('setNewPassword'), url: `/${locale}/my-account/new-password` },
  ];

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <PageTitle nameSpace={'MyAccount'} spaceKey={'setNewPassword'} />
      <FormPageWrapper>
        <Breadcrumbs links={breadcrumbsLinks} locale={locale} />
        <Container>
          <FormContainer>
            <NewPasswordForm />
          </FormContainer>
        </Container>
      </FormPageWrapper>
    </>
  );
}

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      messages: (await import(`../../../translations/${locale}.json`)).default,
    },
  };
};
