import { RegistrationForm } from '@/components/global/forms/RegistrationForm';
import { Container, Title } from '@/styles/components';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import wpRestApi from '@/services/wpRestApi';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { LoginRegPageWrapper } from '../login/styles';

export default function Registration() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: '/' },
    { name: tBreadcrumbs('myAccount'), url: '/my-account' },
    { name: t('registration'), url: '/my-account/registration' },
  ];

  return (
    <LoginRegPageWrapper>
      <Breadcrumbs links={breadcrumbsLinks} />
      <Container>
        <FormContainer>
          <RegistrationForm />
        </FormContainer>
      </Container>
    </LoginRegPageWrapper>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.cookies;
  if (!cookies?.authToken) return { props: {} };

  try {
    const response = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );
    if (!response.data) return { props: {} };

    return {
      redirect: {
        destination: '/my-account',
        permanent: false,
      },
    };
  } catch (err) {
    console.error(err);
    return { props: {} };
  }
};
