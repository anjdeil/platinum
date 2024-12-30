import AccountInfoBlockList from '@/components/pages/account/AccountInfoBlockList/AccountInfoBlockList';
import AccountLayout from '@/components/pages/account/AccountLayout';
import AccountLinkBlockList from '@/components/pages/account/AccountLinkBlockList/AccountLinkBlockList';
import { transformOrders } from '@/services/transformers/transformOrders';
import { useFetchOrdersQuery } from '@/store/rtk-queries/wooCustomApi';
import { setUser } from '@/store/slices/userSlice';
import { AccountInfoWrapper } from '@/styles/components';
import { saveUserToLocalStorage } from '@/utils/auth/userLocalStorage';
import { accountLinkList } from '@/utils/consts';
import axios from 'axios';
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
  const cookies = context.req.cookies;
  const reqUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

  try {
    if (!cookies?.authToken)
      throw new Error('Invalid or missing authentication token');
    const resp = await axios.get(`${reqUrl}/api/wooAuth/customers`, {
      headers: {
        Cookie: `authToken=${cookies.authToken}`,
      },
    });

    if (!resp.data) throw new Error('Invalid or missing authentication token');

    return {
      props: {
        user: resp.data,
      },
    };
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

interface MyAccountPropsType {
  user: UserType;
}

const MyAccount: FC<MyAccountPropsType> = ({ user }) => {
  const t = useTranslations('MyAccount');

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
    per_page: 5,
  });

  const translatedAccountLinkList = accountLinkList.map(
    ({ title, ...props }) => ({
      title: t(title),
      ...props,
    })
  );

  const { orderCount, totalAmount } = transformOrders(ordersData || []);

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
      {/* <OrderTable orderList={ordersData} title={t("recentOrders")} /> */}
    </AccountLayout>
  );
};

export default MyAccount;
