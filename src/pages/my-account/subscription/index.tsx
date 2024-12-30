import AccountLayout from '@/components/pages/account/AccountLayout';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import {
  useGetSubscriberQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '@/store/rtk-queries/mailpoetApi';
import { useEffect, useState } from 'react';
import { Switch, ToggleButton } from '@mui/material';
import { FlexBox } from '@/styles/components';
import axios from 'axios';
import { CustomSwitch } from './style';
import Notification from '@/components/global/Notification/Notification';

interface SubscriptionProps {
  email: string;
}

export default function Subscription({ email }: SubscriptionProps) {
  const t = useTranslations('MyAccount');
  const { data, isLoading, error, isSuccess } = useGetSubscriberQuery({
    email,
  });

  const [subscribe, { isSuccess: isSubSuc }] = useSubscribeMutation();
  const [unsubscribe, { isSuccess: isUnSubSuc }] = useUnsubscribeMutation();
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    if (data?.subscriptions) {
      const filteredSubscriptions = data.subscriptions
        .filter(item => item.status === 'subscribed')
        .map(item => item.id.toString());
      setSubscriptions(filteredSubscriptions);
    }
  }, [data]);

  const [isSubSucState, setIsSubSucState] = useState(false);
  const [isUnSubSucState, setIsUnSubSucState] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Функция для показа уведомления
  const showSuccessMessage = (type: string) => {
    if (type === 'subscribe') {
      setIsSubSucState(true);
    } else if (type === 'unsubscribe') {
      setIsUnSubSucState(true);
    }

    setShowNotification(true);

    // Убираем уведомление через 1.5 секунды
    setTimeout(() => {
      setShowNotification(false);
      setIsSubSucState(false);
      setIsUnSubSucState(false);
    }, 3000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching subscriber data</div>;
  }

  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    id: string
  ) => {
    if (checked) {
      try {
        await subscribe({ email });
        setSubscriptions(prevSubscriptions => [...prevSubscriptions, id]);
        showSuccessMessage('subscribe');
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    } else {
      try {
        await unsubscribe({ email });
        setSubscriptions(prevSubscriptions =>
          prevSubscriptions.filter(sub => sub !== id)
        );
        showSuccessMessage('unsubscribe');
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    }
  };

  return (
    <AccountLayout title={t('subscription')}>
      <FlexBox alignItems="center">
        <CustomSwitch
          checked={subscriptions.includes('13600')}
          onChange={event =>
            handleSwitchChange(event, event.target.checked, '13600')
          }
        />
        <p>Subscribe to mail sent N 13600</p>
      </FlexBox>
      <FlexBox alignItems="center">
        <CustomSwitch
          checked={subscriptions.includes('13601')}
          onChange={event =>
            handleSwitchChange(event, event.target.checked, '13601')
          }
        />
        <p>Subscribe to mail sent N 13601</p>
      </FlexBox>
      <FlexBox alignItems="center">
        <CustomSwitch
          checked={subscriptions.includes('13604')}
          onChange={event =>
            handleSwitchChange(event, event.target.checked, '13604')
          }
        />
        <p>Subscribe to mail sent N 13604</p>
      </FlexBox>
      <FlexBox margin="20px 0 0 0">
        {(isUnSubSucState || isSubSucState) && showNotification && (
          <Notification type="success" show={showNotification}>
            {isSubSucState
              ? 'You have successfully subscribed to the newsletter'
              : 'You have successfully unsubscribed from the newsletter'}
          </Notification>
        )}
      </FlexBox>
    </AccountLayout>
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

    console.log(resp);

    return {
      props: {
        //@ts-ignore
        email: resp.data.email,
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
