import AccountInfoBlockList from '@/components/pages/account/AccountInfoBlockList/AccountInfoBlockList';
import AccountLayout from '@/components/pages/account/AccountLayout';
import AccountLinkBlockList from '@/components/pages/account/AccountLinkBlockList/AccountLinkBlockList';
import OrderTable from '@/components/pages/order/OrderTable/OrderTable';
import wooCommerceRestApi from '@/services/wooCommerceRestApi';
import wpRestApi from '@/services/wpRestApi';
import { useGetUserTotalsQuery } from '@/store/rtk-queries/userTotals/userTotals';
import { useFetchOrdersQuery } from '@/store/rtk-queries/wooCustomApi';
import { setUser } from '@/store/slices/userSlice';
import { AccountInfoWrapper } from '@/styles/components';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from '@/utils/auth/userLocalStorage';
import { accountLinkList } from '@/utils/consts';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

// Delete this interface when we have a user type
interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  loyaltyProgram?: string;
}

export const getServerSideProps: GetServerSideProps = async (
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
    const customerResp = await wooCommerceRestApi.get(
      `customers/${customerId}`
    );
    if (!customerResp?.data)
      throw new Error('Invalid or missing authentication token');

    return {
      props: {
        user: customerResp.data,
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

interface MyAccountPropsType {
  user: UserType;
}

const MyAccount: FC<MyAccountPropsType> = ({ user }) => {
  const t = useTranslations('MyAccount');

  const { data: userTotal, isLoading } = useGetUserTotalsQuery(user.id);

  const dispatch = useDispatch();
  const userLocal = getUserFromLocalStorage();

  const level = userTotal?.loyalty_status;

  if (!userLocal) {
    const userData = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    dispatch(setUser(userData));

    saveUserToLocalStorage(userData);
  }

  const { isLoading: ordersLoading, data: ordersData } = useFetchOrdersQuery({
    customer: user.id,
    per_page: 100,
    status: 'processing,completed,cancelled,pending,refunded,failed',
  });

  const translatedAccountLinkList = accountLinkList.map(
    ({ title, ...props }) => ({
      title: t(title),
      ...props,
    })
  );

  return (
    <AccountLayout title={t('clientPersonalAccount')}>
      <AccountInfoWrapper mobileReverse={true}>
        <AccountInfoBlockList
          orderCount={userTotal?.order_count}
          totalAmount={Number(userTotal?.total_spent)}
          loyaltyProgram={level || null}
          isLoading={isLoading}
        />
        <AccountLinkBlockList list={translatedAccountLinkList} />
      </AccountInfoWrapper>
      {ordersLoading ? (
        <OrderTable title={t('recentOrders')} />
      ) : (
        Boolean(ordersData?.length) && (
          <OrderTable orderList={ordersData} title={t('recentOrders')} />
        )
      )}
    </AccountLayout>
  );
};

export default MyAccount;
