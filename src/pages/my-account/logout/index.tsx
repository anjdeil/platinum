import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store';
import { setAuthState } from '@/store/slices/userSlice';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

export default function Logout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setAuthState(false));
    console.log('dispatch auth');

    router.replace('/my-account/login');
  }, [dispatch, router]);

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
    'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
  );

  return { props: {} };
};
