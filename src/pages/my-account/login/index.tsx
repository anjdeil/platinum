import { Container } from '@/styles/components';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import wpRestApi from '@/services/wpRestApi';
import { LoginForm } from '@/components/global/forms/LoginForm';
import { FormContainer } from '@/components/pages/account/styles';

export default function Login() {
  return (
    <>
      <Head>
        <title>My account registration</title>
      </Head>
      <Container>
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </Container>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.cookies;
  if (!cookies?.authToken) return { props: {} };

  try {
    const response = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );
    if (!response.data) return { props: {} };

    return {
      redirect: {
        destination: '/my-account',
        permanent: false,
      },
    };
  } catch (err) {
    console.error(err);
    return { props: {} };
  }
};
