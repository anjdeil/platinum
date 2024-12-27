import { UserInfoForm } from '@/components/global/forms/UserInfoForm';
import AccountLayout from '@/components/pages/account/AccountLayout';
import { useTranslations } from 'next-intl';

export default function UserInformation() {
  const t = useTranslations('MyAccount');
  return (
    <>
      <AccountLayout title={t('EditUserInfo')}>
        <UserInfoForm />
      </AccountLayout>
    </>
  );
}
