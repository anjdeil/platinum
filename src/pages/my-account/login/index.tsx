import { Container, FormPageWrapper } from '@/styles/components';
import { GetServerSidePropsContext } from 'next';
import wpRestApi from '@/services/wpRestApi';
import { LoginForm } from '@/components/global/forms/LoginForm';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { removeUserFromLocalStorage } from '@/utils/auth/userLocalStorage';

export default function Login() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');
  removeUserFromLocalStorage();
  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: '/' },
    { name: tBreadcrumbs('myAccount'), url: '/my-account' },
    { name: t('log-In'), url: '/my-account/login' },
  ];

  return (
    <FormPageWrapper>
      <Breadcrumbs links={breadcrumbsLinks} />
      <Container>
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </Container>
    </FormPageWrapper>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  const cookies = context.req.cookies;
  if (!cookies?.authToken) return { props: {} };

  try {
    const authResp = await wpRestApi.post('jwt-auth/v1/token/validate', {}, false, `Bearer ${cookies.authToken}`);
    if (authResp?.data?.code !== 'jwt_auth_valid_token') return { props: {} };

    return {
      redirect: {
        destination: `/${locale}/my-account`,
        permanent: false,
      },
    };
  } catch (err) {
    console.error(err);
    return { props: {} };
  }
};
