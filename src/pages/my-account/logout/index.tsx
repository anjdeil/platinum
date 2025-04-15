import { PageTitle } from '@/components/pages/pageTitle';
import { removeUserFromLocalStorage } from '@/utils/auth/userLocalStorage';
import { GetServerSidePropsContext } from 'next';

export default function Logout() {
  return <PageTitle nameSpace={'MyAccount'} spaceKey={'logoutPage'} />;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { res, locale } = context;
  res.setHeader(
    'Set-Cookie',
    'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; '
  );
  removeUserFromLocalStorage();
  return {
    redirect: {
      destination: `/${locale}/my-account/login`,
      permanent: false,
    },
  };
};
