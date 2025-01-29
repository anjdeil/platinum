import AccountInfoBlockList from '@/components/pages/account/AccountInfoBlockList/AccountInfoBlockList';
import AccountLayout from '@/components/pages/account/AccountLayout';
import AccountLinkBlockList from '@/components/pages/account/AccountLinkBlockList/AccountLinkBlockList';
import OrderTable from '@/components/pages/order/OrderTable/OrderTable';
import { transformOrders } from '@/services/transformers/transformOrders';
import { useAppSelector } from '@/store';
import { useFetchOrdersQuery } from '@/store/rtk-queries/wooCustomApi';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
import { setUser } from '@/store/slices/userSlice';
import { AccountInfoWrapper } from '@/styles/components';
import { saveUserToLocalStorage } from '@/utils/auth/userLocalStorage';
import { accountLinkList } from '@/utils/consts';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import wpRestApi from '@/services/wpRestApi';
import { decodeJwt } from 'jose';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import wooCommerceRestApi from '@/services/wooCommerceRestApi';

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
    if (!cookies?.authToken) throw new Error('Invalid or missing authentication token');

    const authResp = await wpRestApi.post('jwt-auth/v1/token/validate', {}, false, `Bearer ${cookies.authToken}`);
    if (authResp?.data?.code !== 'jwt_auth_valid_token') throw new Error('Invalid or missing authentication token');

    const jwtDecodedData = decodeJwt(cookies.authToken) as JwtDecodedDataType;
    const isJwtDecodedDataValid = await validateJwtDecode(jwtDecodedData);
    if (!isJwtDecodedDataValid) throw new Error('Invalid or missing authentication token');

    const customerId = jwtDecodedData.data.user.id;
    const customerResp = await wooCommerceRestApi.get(`customers/${customerId}`);
    if (!customerResp?.data) throw new Error('Invalid or missing authentication token');

    return {
      props: {
        user: customerResp.data,
      }
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
  const { data: currencies } = useGetCurrenciesQuery();
  const selectedCurrency = useAppSelector(state => state.currencySlice.name);

  const dispatch = useDispatch();

  const userData = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };

  dispatch(setUser(userData));

  saveUserToLocalStorage(userData);

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

  const { orderCount, totalAmount } =
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
