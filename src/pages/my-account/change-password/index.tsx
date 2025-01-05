import { Container } from '@/styles/components';
import { GetServerSidePropsContext } from 'next';
import { FormContainer } from '@/components/pages/account/styles';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import wpRestApi from '@/services/wpRestApi';
import { ChangePasswordForm } from '@/components/global/forms/password/ChangePasswordForm';
import { useTranslations } from 'next-intl';
import AccountLayout from '@/components/pages/account/AccountLayout';

interface Props {
  defaultCustomerData: WooCustomerReqType;
}

export default function ResetPassword({ defaultCustomerData }: Props) {
  const t = useTranslations('MyAccount');
  return (
    <>
      <Container>
        <AccountLayout title={t('EditUserInfo')}>
          <ChangePasswordForm />
        </AccountLayout>
      </Container>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.cookies;

  try {
    if (!cookies?.authToken)
      throw new Error('Invalid or missing authentication token');
    const response = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );

    if (!response.data)
      throw new Error('Invalid or missing authentication token');

    return { props: {} };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: '/my-account/login',
        permanent: false,
      },
    };
  }
};
