import { UserInfoForm } from '@/components/global/forms/UserInfoForm';
import AccountLayout from '@/components/pages/account/AccountLayout';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import axios from 'axios';
interface Props {
  defaultCustomerData: WooCustomerReqType;
}

export default function UserInformation({ defaultCustomerData }: Props) {
  const t = useTranslations('MyAccount');
  return (
    <AccountLayout title={t('EditUserInfo')}>
      <UserInfoForm defaultCustomerData={defaultCustomerData} />
    </AccountLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.cookies;
  const reqUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

  try {
    if (!cookies?.authToken)
      throw new Error('Invalid or missing authentication token');
    const resp = await axios.get(`${reqUrl}/api/wooAuth/customers`, {
      headers: {
        Cookie: `authToken=${cookies.authToken}`,
      },
    });

    if (!resp.data) throw new Error('Invalid or missing authentication token');

    return {
      props: {
        defaultCustomerData: resp.data,
      },
    };
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
