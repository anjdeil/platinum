import { Container, Title } from '@/styles/components';

import { GetServerSidePropsContext } from 'next';
import wpRestApi from '@/services/wpRestApi';
import { LoginForm } from '@/components/global/forms/LoginForm';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { LoginRegPageWrapper } from './styles';

export default function Login() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: '/' },
    { name: tBreadcrumbs('myAccount'), url: '/my-account' },
    { name: t('log-In'), url: '/my-account/login' },
  ];

  return (
    <LoginRegPageWrapper>
      <Breadcrumbs links={breadcrumbsLinks} />
      <Container>
        <FormContainer>
          <LoginForm />
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
