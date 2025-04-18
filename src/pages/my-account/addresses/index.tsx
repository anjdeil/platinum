import { Container } from '@/styles/components';
import { GetServerSidePropsContext } from 'next';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import AccountLayout from '@/components/pages/account/AccountLayout';
import { useTranslations } from 'next-intl';
import { ChangeShippingForm } from '@/components/global/forms/ChangeShippingForm/ChangeShippingForm';
import wpRestApi from '@/services/wpRestApi';
import { decodeJwt } from 'jose';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import wooCommerceRestApi from '@/services/wooCommerceRestApi';

interface Props {
  defaultCustomerData: WooCustomerReqType;
}

export default function Addresses({ defaultCustomerData }: Props) {
  const t = useTranslations('MyAccount');
  return (
    <>
      <Container>
        <AccountLayout title={t('Addresses')}>
          <ChangeShippingForm defaultCustomerData={defaultCustomerData} />
        </AccountLayout>
      </Container>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
 const { locale } = context;
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
   const customerResp = await wooCommerceRestApi.get(`customers/${customerId}`);
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
       destination: `/${locale}/my-account/login`,
       permanent: false,
     },
   };
 }
};
