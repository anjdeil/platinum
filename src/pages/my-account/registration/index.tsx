import { Container, FormPageWrapper } from '@/styles/components';
import { GetServerSidePropsContext } from 'next';
import wpRestApi from '@/services/wpRestApi';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { RegistrationForm } from '@/components/global/forms/RegistrationForm';
import { PageTitle } from '@/components/pages/pageTitle';
import { useRouter } from 'next/router';

export default function Registration() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');
  const { locale } = useRouter();

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: `/${locale}` },
    { name: tBreadcrumbs('myAccount'), url: `/${locale}/my-account` },
    { name: t('registration'), url: `/${locale}/my-account/registration` },
  ];

  return (
    <>
      <PageTitle nameSpace={'MyAccount'} spaceKey={'registration'} />
      <FormPageWrapper>
        <Breadcrumbs links={breadcrumbsLinks} />
        <Container>
          <FormContainer>
            <RegistrationForm />
          </FormContainer>
        </Container>
      </FormPageWrapper>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.cookies;
  const { locale } = context;
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
        destination: `/${locale}/my-account/login`,
        permanent: false,
      },
    };
  } catch (err) {
    console.error(err);
    return { props: {} };
  }
};
