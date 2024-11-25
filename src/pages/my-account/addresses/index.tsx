import { Container } from '@/styles/components';
import { GetServerSidePropsContext } from 'next';
import { FormContainer } from '@/components/pages/account/styles';
import axios from 'axios';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { ChangeShippingForm } from '@/components/global/forms/ChangeShippingForm';

interface Props {
  defaultCustomerData: WooCustomerReqType;
}

export default function Addresses({ defaultCustomerData }: Props) {
  return (
    <>
      <Container>
        <FormContainer>
          <ChangeShippingForm defaultCustomerData={defaultCustomerData} />
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