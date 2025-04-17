import AccountLayout from '@/components/pages/account/AccountLayout';
import OrderTable from '@/components/pages/order/OrderTable/OrderTable';
import { useResponsive } from '@/hooks/useResponsive';
import wpRestApi from '@/services/wpRestApi';
import { useFetchOrdersQuery } from '@/store/rtk-queries/wooCustomApi';
import parseCookies from '@/utils/parseCookies';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

// Delete this interface when we have a user type
interface UserType {
  id: number;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  const cookies = context.req.headers.cookie;
  if (!cookies) {
    return {
      redirect: {
        destination: `/${locale}/my-account/login`,
        permanent: false,
      },
    };
  }

  const cookieRows = parseCookies(cookies);
  if (!cookieRows.authToken) {
    return {
      redirect: {
        destination: `/${locale}/my-account/login`,
        permanent: false,
      },
    };
  }

  try {
    const userResponse = await wpRestApi.get(
      `users/me`,
      { path: ['users', 'me'] },
      `Bearer ${cookieRows.authToken}`
    );

    const userData = userResponse.data;
    if (!userData) {
      return {
        redirect: {
          destination: `/${locale}/my-account/login`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: userData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

interface OrdersPropsType {
  user: UserType;
}

const Orders: FC<OrdersPropsType> = ({ user }) => {
  const t = useTranslations('MyAccount');
  const { isTablet } = useResponsive();

  const { data: ordersData } = useFetchOrdersQuery({
    customer: user.id,
    status: 'processing,completed,cancelled,pending,refunded,failed',
  });

  return (
    <AccountLayout
      title={isTablet ? t('recentOrders') : ''}
      nameSpace={'MyAccount'}
      spaceKey={'recentOrders'}
    >
      <OrderTable
        orderList={ordersData}
        title={!isTablet ? t('recentOrders') : ''}
      />
    </AccountLayout>
  );
};

export default Orders;
