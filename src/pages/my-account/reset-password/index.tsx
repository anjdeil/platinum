import { Container, FormPageWrapper } from '@/styles/components';
import { FormContainer } from '@/components/pages/account/styles';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import ResetPasswordForm from '@/components/global/forms/password/ResetPasswordForm/ResetPasswordForm';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { PageTitle } from '@/components/pages/pageTitle';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');
  const { locale } = useRouter();

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: `/${locale}` },
    { name: tBreadcrumbs('myAccount'), url: `/${locale}/my-account` },
    { name: t('resetPassword'), url: `/${locale}/my-account/reset-password` },
  ];

  return (
    <>
      <PageTitle nameSpace={'MyAccount'} spaceKey={'resetPassword'} />
      <FormPageWrapper>
        <Breadcrumbs links={breadcrumbsLinks} locale={locale} />
        <Container>
          <FormContainer>
            <ResetPasswordForm />
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
