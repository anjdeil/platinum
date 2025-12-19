import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { LoginForm } from '@/components/global/forms/LoginForm';
import { FormContainer } from '@/components/pages/account/styles';
import { PageTitle } from '@/components/pages/pageTitle';
import wpRestApi from '@/services/wpRestApi';
import { useAppDispatch } from '@/store';
import { clearCoupon } from '@/store/slices/cartSlice';
import { clearCheckoutState } from '@/store/slices/checkoutSlice';
import { clearUser } from '@/store/slices/userSlice';
import { Container, FormPageWrapper } from '@/styles/components';
import { removeUserFromLocalStorage } from '@/utils/auth/userLocalStorage';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const { locale } = useRouter();
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearUser());

    dispatch(clearCoupon());
    dispatch(clearCheckoutState());
    removeUserFromLocalStorage();
  }, [dispatch]);

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: `/${locale}` },
    { name: tBreadcrumbs('myAccount'), url: `/${locale}/my-account` },
    { name: t('log-In'), url: `/${locale}/my-account/login` },
  ];

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <PageTitle nameSpace={'MyAccount'} spaceKey={'loginPage'} />
      <FormPageWrapper>
        <Breadcrumbs links={breadcrumbsLinks} locale={locale} />
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
