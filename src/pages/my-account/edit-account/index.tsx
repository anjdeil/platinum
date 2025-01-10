import { FormContainer } from '@/components/pages/account/styles';
import { useAppDispatch } from '@/store';
import { Container } from '@/styles/components';
import { WooCustomerReqType } from '@/types/services/wooCustomApi/customer';
import { updateUserData } from '@/utils/auth/userLocalStorage';

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
          {/* <ChangeInfoForm
            defaultCustomerData={defaultCustomerData}
            onUserUpdate={handleUpdateUser}
          /> */}
        </FormContainer>
      </Container>
    </>
  );
}
