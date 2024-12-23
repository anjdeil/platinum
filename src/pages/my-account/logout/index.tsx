import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import wpRestApi from '@/services/wpRestApi';

export default function Logout() {
  return (
    <Head>
      <title>Logout</title>
    </Head>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { res } = context;
  res.setHeader(
    'Set-Cookie',
    'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; '
  );

  return {
    redirect: {
      destination: '/my-account/login',
      permanent: false,
    },
  };
};
