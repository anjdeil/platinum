import AccountInfoBlockList from '@/components/pages/account/AccountInfoBlockList/AccountInfoBlockList';
import AccountLayout from '@/components/pages/account/AccountLayout';
import AccountLinkBlockList from '@/components/pages/account/AccountLinkBlockList/AccountLinkBlockList';
import OrderTable from '@/components/pages/order/OrderTable/OrderTable';
import { transformOrders } from '@/services/transformers/transformOrders';
import wpRestApi from '@/services/wpRestApi';
import { useAppSelector } from '@/store';
import { useFetchOrdersQuery } from '@/store/rtk-queries/wooCustomApi';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
import { AccountInfoWrapper } from '@/styles/components';
import { accountLinkList, redirectToLogin } from '@/utils/consts';
import parseCookies from '@/utils/parseCookies';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

// Delete this interface when we have a user type
interface UserType {
  id: number;
  loyaltyProgram?: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.headers.cookie;
  if (!cookies) return redirectToLogin;

  const cookieRows = parseCookies(cookies);
  if (!cookieRows.authToken) return redirectToLogin;

  try {
    const userResponse = await wpRestApi.get(
      `users/me`,
      {},
      `Bearer ${cookieRows.authToken}`
    );

    const userData = userResponse.data;
    if (!userData) return redirectToLogin;

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

interface MyAccountPropsType {
  user: UserType;
}

const MyAccount: FC<MyAccountPropsType> = ({ user }) => {
  const t = useTranslations('MyAccount');
  const { data: currencies, isLoading: isCurrenciesLoading } =
    useGetCurrenciesQuery();
  const selectedCurrency = useAppSelector(state => state.currencySlice.name);

  const { data: ordersData } = useFetchOrdersQuery({
    customer: user.id,
    per_page: 100,
  });

  const translatedAccountLinkList = accountLinkList.map(
    ({ title, ...props }) => ({
      title: t(title),
      ...props,
    })
  );

  const { orderCount, totalAmountPLN, totalAmount } =
    currencies && ordersData
      ? transformOrders(ordersData, currencies, selectedCurrency)
      : { orderCount: undefined, totalAmount: undefined };

  return (
    <AccountLayout title={t('clientPersonalAccount')}>
      <AccountInfoWrapper>
        <AccountInfoBlockList
          orderCount={orderCount}
          totalAmount={totalAmount}
          loyaltyProgram={user.loyaltyProgram || null}
        />
        <AccountLinkBlockList list={translatedAccountLinkList} />
      </AccountInfoWrapper>
      <OrderTable orderList={ordersData} title={t('recentOrders')} />
    </AccountLayout>
  );
};

export default MyAccount;
