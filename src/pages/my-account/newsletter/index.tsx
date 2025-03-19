import AccountLayout from '@/components/pages/account/AccountLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import {
  useGetSubscriberQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '@/store/rtk-queries/mailpoetApi';
import { useEffect, useRef, useState } from 'react';
import { AccountTitle, FlexBox } from '@/styles/components';

import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import theme from '@/styles/theme';
import wpRestApi from '@/services/wpRestApi';
import { decodeJwt } from 'jose';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import wooCommerceRestApi from '@/services/wooCommerceRestApi';
import {
  CustomSwitch,
  SubscribeDescText,
  SubscribeText,
  SubscriptionCardWrapper,
  SubscriptionWrapper,
} from '@/components/pages/account/Newsletter/style';

interface SubscriptionProps {
  email: string;
}

export default function Subscription({ email }: SubscriptionProps) {
  const t = useTranslations('MyAccount');
  const { data, isLoading, error } = useGetSubscriberQuery({
    email,
  });

  const [subscribe, { isSuccess: isSubSuc }] = useSubscribeMutation();
  const [unsubscribe, { isSuccess: isUnSubSuc }] = useUnsubscribeMutation();
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSwitchDisabled, setIsSwitchDisabled] = useState<boolean>(false);
  useEffect(() => {
    if (data?.subscriptions) {
      const filteredSubscriptions = data.subscriptions
        .filter(item => item.status === 'subscribed')
        .map(item => item.segment_id.toString());
      setSubscriptions(filteredSubscriptions);
    }
  }, [data]);

  const [showNotification, setShowNotification] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const lastAction = useRef<'subscribe' | 'unsubscribe' | null>(null);

  useEffect(() => {
    if (isSubSuc || isUnSubSuc) {
      setShowNotification(true);
      setFadeOut(false);

      if (lastAction.current === 'subscribe') {
        setNotificationMessage(t('subscriptionSuccess'));
      } else if (lastAction.current === 'unsubscribe') {
        setNotificationMessage(t('unsubscriptionSuccess'));
      }

      const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
      const hideTimer = setTimeout(() => setShowNotification(false), 2500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isSubSuc, isUnSubSuc]);

  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    id: string
  ) => {
    if (isSwitchDisabled) return;

    setIsSwitchDisabled(true);
    setTimeout(() => setIsSwitchDisabled(false), 2500);

    if (checked) {
      lastAction.current = 'subscribe';
      try {
        await subscribe({ email });
        setSubscriptions(prevSubscriptions => [...prevSubscriptions, id]);
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    } else {
      lastAction.current = 'unsubscribe';
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
    <AccountLayout>
      <AccountTitle as={'h1'} textalign="center" uppercase marginBottom="24">
        {t('subscription')}
      </AccountTitle>
      {error && (
        <Notification type="info">{t('subscriptionError')}</Notification>
      )}
      {isLoading ? (
        <MenuSkeleton
          elements={1}
          direction="column"
          width="100%"
          height="137px"
          gap="8px"
          color={theme.background.skeletonSecondary}
        />
      ) : (
        <SubscriptionWrapper>
          <SubscriptionCardWrapper>
            <CustomSwitch
              disabled={isSwitchDisabled}
              checked={subscriptions.includes('3')}
              onChange={event =>
                handleSwitchChange(event, event.target.checked, '3')
              }
            />
            <FlexBox flexDirection="column" gap="10px">
              <SubscribeText>{t('subscribeNewsletter')}</SubscribeText>
              <SubscribeDescText>
                {t('newsletterDescription')}
              </SubscribeDescText>
            </FlexBox>
          </SubscriptionCardWrapper>
          <FlexBox margin="20px 0 0 0">
            {showNotification && (
              <Notification type="success" isVisible={fadeOut}>
                {notificationMessage}
              </Notification>
            )}
          </FlexBox>
        </SubscriptionWrapper>
      )}
    </AccountLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  const cookies = context.req.cookies;

  try {
    if (!cookies?.authToken)
      throw new Error('Invalid or missing authentication token');

    const authResp = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );
    if (authResp?.data?.code !== 'jwt_auth_valid_token')
      throw new Error('Invalid or missing authentication token');

    const jwtDecodedData = decodeJwt(cookies.authToken) as JwtDecodedDataType;
    const isJwtDecodedDataValid = await validateJwtDecode(jwtDecodedData);
    if (!isJwtDecodedDataValid)
      throw new Error('Invalid or missing authentication token');

    const customerId = jwtDecodedData.data.user.id;
    const customerResp = await wooCommerceRestApi.get(
      `customers/${customerId}`
    );

    if (!customerResp?.data)
      throw new Error('Invalid or missing authentication token');

    return {
      props: {
        email: customerResp.data.email,
      },
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
