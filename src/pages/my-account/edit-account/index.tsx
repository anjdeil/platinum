import { ChangeInfoForm } from '@/components/global/forms/ChangeInfoForm';
import { FormContainer } from '@/components/pages/account/styles';
import { useAppDispatch } from '@/store';
import { Container } from '@/styles/components';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { updateUserData } from '@/utils/auth/userLocalStorage';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

interface Props {
  defaultCustomerData: WooCustomerReqType;
}

export default function UserInfo({ defaultCustomerData }: Props) {
  console.log('userInfo...', defaultCustomerData);

  const dispatch = useAppDispatch();

  const handleUpdateUser = (newUserData: WooCustomerReqType) => {
    updateUserData(dispatch, newUserData);
  };

  return (
    <>
      <Container>
        <FormContainer>
          <ChangeInfoForm
            defaultCustomerData={defaultCustomerData}
            onUserUpdate={handleUpdateUser}
          />
        </FormContainer>
      </Container>
    </>
  );
}

export const getServerSideProps = async (
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
        defaultCustomerData: resp.data,
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
