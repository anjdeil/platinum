import { UserInfoForm } from '@/components/global/forms/UserInfoForm';
import AccountLayout from '@/components/pages/account/AccountLayout';
import wooCommerceRestApi from '@/services/wooCommerceRestApi';
import wpRestApi from '@/services/wpRestApi';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';
import { GetServerSidePropsContext } from 'next';
interface Props {
  defaultCustomerData: WooCustomerReqType;
}

export default function UserInformation({ defaultCustomerData }: Props) {
  return (
    <AccountLayout nameSpace={'Forms'} spaceKey={'UserInfo'}>
      <UserInfoForm defaultCustomerData={defaultCustomerData} />
    </AccountLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.cookies;

  try {
    if (!cookies?.authToken)
      throw new Error('Invalid or missing authentication token');

    const authResp = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );
    if (authResp?.data?.code !== 'jwt_auth_valid_token')
      throw new Error('Invalid or missing authentication token');

    const jwtDecodedData = decodeJwt(cookies.authToken) as JwtDecodedDataType;
    const isJwtDecodedDataValid = await validateJwtDecode(jwtDecodedData);
    if (!isJwtDecodedDataValid)
      throw new Error('Invalid or missing authentication token');

    const customerId = jwtDecodedData.data.user.id;
    const customerResp = await wooCommerceRestApi.get(
      `customers/${customerId}`
    );
    if (!customerResp?.data)
      throw new Error('Invalid or missing authentication token');

    return {
      props: {
        defaultCustomerData: customerResp.data,
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
