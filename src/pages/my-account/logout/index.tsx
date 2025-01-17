import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

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
  const { res, locale } = context;
  res.setHeader(
    'Set-Cookie',
    'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; '
  );

  return {
    redirect: {
      destination: `/${locale}/my-account/login`,
      permanent: false,
    },
  };
};
