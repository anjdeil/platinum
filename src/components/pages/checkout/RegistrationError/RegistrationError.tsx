import Notification from '@/components/global/Notification/Notification';
import { FlexBox } from '@/styles/components';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/store';
import { Button } from '@mui/material';
import { popupToggle } from '@/store/slices/PopupSlice';

export const RegistrationError = ({ message }: { message: string | null }) => {
  const tMyAccount = useTranslations('MyAccount');
  const dispatch = useAppDispatch();
  const errorMessage =
    message ||
    'Oops! Something went wrong with the server. Please try again or contact support.';

  if (
    errorMessage.includes(
      'An account is already registered with your email address.'
    )
  ) {
    return (
      <Notification type={'warning'}>
        <FlexBox justifyContent="flex-end" alignItems="center">
          <p>{tMyAccount('AlreadyHaveAnAccount')} </p>
          <Button onClick={() => dispatch(popupToggle('login'))}>
            {tMyAccount('log-In')}!
          </Button>
        </FlexBox>
      </Notification>
    );
  }

  return <Notification type={'warning'}>{errorMessage}</Notification>;
};
