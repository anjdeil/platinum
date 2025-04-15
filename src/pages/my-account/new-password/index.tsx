import { Container, FormPageWrapper } from '@/styles/components';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { NewPasswordForm } from '@/components/global/forms/password/NewPasswordForm';
import { GetServerSidePropsContext } from 'next';
import { PageTitle } from '@/components/pages/pageTitle';

export default function ResetPassword() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: '/' },
    { name: tBreadcrumbs('myAccount'), url: '/my-account' },
    { name: t('setNewPassword'), url: '/my-account/new-password' },
  ];

  return (
    <>
      <PageTitle nameSpace={'MyAccount'} spaceKey={'setNewPassword'} />
      <FormPageWrapper>
        <Breadcrumbs links={breadcrumbsLinks} />
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
