import { Container, FormPageWrapper } from '@/styles/components';
import { GetServerSidePropsContext } from 'next';
import wpRestApi from '@/services/wpRestApi';
import { LoginForm } from '@/components/global/forms/LoginForm';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { removeUserFromLocalStorage } from '@/utils/auth/userLocalStorage';
import { useAppDispatch } from '@/store';
import { clearUser } from '@/store/slices/userSlice';
import { PageTitle } from '@/components/pages/pageTitle';
import { useRouter } from 'next/router';

export default function Login() {
  const { locale } = useRouter();
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');
  const dispatch = useAppDispatch();
  dispatch(clearUser());
  removeUserFromLocalStorage();
  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: `/${locale}` },
    { name: tBreadcrumbs('myAccount'), url: `/${locale}/my-account` },
    { name: t('log-In'), url: `/${locale}/my-account/login` },
  ];

  return (
    <>
      <PageTitle nameSpace={'MyAccount'} spaceKey={'loginPage'} />
      <FormPageWrapper>
        <Breadcrumbs links={breadcrumbsLinks} />
        <Container>
          <FormContainer>
            <LoginForm />
          </FormContainer>
        </Container>
      </FormPageWrapper>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  const cookies = context.req.cookies;
  if (!cookies?.authToken) return { props: {} };

  try {
    const authResp = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );
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
