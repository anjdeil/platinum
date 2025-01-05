import { Container, FormPageWrapper } from '@/styles/components';
import { FormContainer } from '@/components/pages/account/styles';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { LoginRegPageWrapper } from '../login/styles';
import { NewPasswordForm } from '@/components/global/forms/password/NewPasswordForm/NewPasswordForm';

export default function ResetPassword() {
  const t = useTranslations('MyAccount');
  const tBreadcrumbs = useTranslations('Breadcrumbs');

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: '/' },
    { name: tBreadcrumbs('myAccount'), url: '/my-account' },
    { name: t('setNewPassword'), url: '/my-account/new-password' },
  ];

  return (
    <FormPageWrapper>
      <Breadcrumbs links={breadcrumbsLinks} />
      <Container>
        <FormContainer>
          <NewPasswordForm />
        </FormContainer>
      </Container>
    </FormPageWrapper>
  );
}
