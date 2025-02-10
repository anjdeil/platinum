import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import Notification from '@/components/global/Notification/Notification';
import { FlexBox } from '@/styles/components';
import { Button } from '@mui/material';
import { StyledText } from '../style';

type RegistrationErrorProps = {
  message: string | null;
  setIsUserAlreadyExist: (value: boolean) => void;
};
export const RegistrationError = ({
  message,
  setIsUserAlreadyExist,
}: RegistrationErrorProps) => {
  const tMyAccount = useTranslations('MyAccount');
  const dispatch = useAppDispatch();
  const errorMessage = message || tMyAccount('serverError');

  const isUserAlreadyExist = errorMessage.includes(
    'An account is already registered with your email address.'
  );

  if (isUserAlreadyExist) {
    setIsUserAlreadyExist(true);
  }

  if (isUserAlreadyExist) {
    return (
      <Notification type={'warning'}>
        <FlexBox justifyContent="flex-end" alignItems="center">
          <StyledText>{tMyAccount('AlreadyHaveAnAccount')} </StyledText>
          <Button onClick={() => dispatch(popupToggle('login'))}>
            {tMyAccount('log-In')}!
          </Button>
        </FlexBox>
      </Notification>
    );
  }

  return <Notification type={'warning'}>{errorMessage}</Notification>;
};
