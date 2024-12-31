import AccountLayout from '@/components/pages/account/AccountLayout';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import {
  useGetSubscriberQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '@/store/rtk-queries/mailpoetApi';
import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Skeleton,
  Switch,
  ToggleButton,
} from '@mui/material';
import { FlexBox } from '@/styles/components';
import axios from 'axios';
import { CustomSwitch, SubscribeText, SubscriptionWrapper } from './style';
import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';

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

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isSubSuc || isUnSubSuc) {
      setShowNotification(true);

      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubSuc, isUnSubSuc]);

  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    id: string
  ) => {
    if (checked) {
      try {
        await subscribe({ email });
        setSubscriptions(prevSubscriptions => [...prevSubscriptions, id]);
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    } else {
      try {
        await unsubscribe({ email });
        setSubscriptions(prevSubscriptions =>
          prevSubscriptions.filter(sub => sub !== id)
        );
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    }
  };

  return (
    <AccountLayout title={t('subscription')}>
      {error && (
        <Notification type="info"> Couldn't get subscription data</Notification>
      )}
      {isLoading ? (
        <MenuSkeleton
          elements={3}
          direction="column"
          width="100%"
          height="33px"
          gap="15px"
        />
      ) : (
        <SubscriptionWrapper>
          <FlexBox alignItems="center" gap="10px">
            <CustomSwitch
              checked={subscriptions.includes('13600')}
              onChange={event =>
                handleSwitchChange(event, event.target.checked, '13600')
              }
            />
            <SubscribeText>
              Subscribe to mail sent N 13600 Subscribe to mail sent N 13600
            </SubscribeText>
          </FlexBox>
          <FlexBox alignItems="center" gap="10px">
            <CustomSwitch
              checked={subscriptions.includes('13601')}
              onChange={event =>
                handleSwitchChange(event, event.target.checked, '13601')
              }
            />
            <SubscribeText>
              Subscribe to mail sent N 13601 Subscribe to mail sent N 13601
            </SubscribeText>
          </FlexBox>
          <FlexBox alignItems="center" gap="10px">
            <CustomSwitch
              checked={subscriptions.includes('13604')}
              onChange={event =>
                handleSwitchChange(event, event.target.checked, '13604')
              }
            />
            <SubscribeText>
              Subscribe to mail sent N 13604 Subscribe to mail sent N 13604
            </SubscribeText>
          </FlexBox>
          <FlexBox margin="20px 0 0 0">
            {(isSubSuc || isUnSubSuc) && showNotification && (
              <Notification type="success" show={showNotification}>
                {isSubSuc
                  ? 'You have successfully subscribed to the newsletter'
                  : 'You have successfully unsubscribed from the newsletter'}
              </Notification>
            )}
          </FlexBox>
        </SubscriptionWrapper>
      )}
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
