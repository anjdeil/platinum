import { Container, FormPageWrapper } from '@/styles/components';
import { FormContainer } from '@/components/pages/account/styles';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import ResetPasswordForm from '@/components/global/forms/password/ResetPasswordForm/ResetPasswordForm';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';

export default function ResetPassword() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: '/' },
    { name: tBreadcrumbs('myAccount'), url: '/my-account' },
    { name: t('resetPassword'), url: '/my-account/reset-password' },
  ];

  return (
    <FormPageWrapper>
      <Breadcrumbs links={breadcrumbsLinks} />
      <Container>
        <FormContainer>
          <ResetPasswordForm />
        </FormContainer>
      </Container>
    </FormPageWrapper>
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
