
import wpRestApi from '@/services/wpRestApi';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';



export default function Addresses({ email: string }) {
  const t = useTranslations('MyAccount');
   return (
  
       <AccountLayout title={t('subscription')}>
         <UserInfoForm />
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
  