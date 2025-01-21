import { Container, FormPageWrapper } from '@/styles/components';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import ResetPasswordForm from '@/components/global/forms/password/ResetPasswordForm/ResetPasswordForm';

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
