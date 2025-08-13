import AccountLayout from '@/components/pages/account/AccountLayout';
import {
  useGetSubscriberQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '@/store/rtk-queries/mailsterApi';
import { AccountTitle, FlexBox } from '@/styles/components';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import {
  CustomSwitch,
  SubscribeDescText,
  SubscribeText,
  SubscriptionCardWrapper,
  SubscriptionWrapper,
} from '@/components/pages/account/Newsletter/style';
import wooCommerceRestApi from '@/services/wooCommerceRestApi';
import wpRestApi from '@/services/wpRestApi';
import theme from '@/styles/theme';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';

interface SubscriptionProps {
  email: string;
  locale: string;
}

export default function Subscription({ email, locale }: SubscriptionProps) {
  const t = useTranslations('MyAccount');
  const { data, isLoading, error } = useGetSubscriberQuery({
    email,
  });

  const [subscribe, { isLoading: isSubLoading }] = useSubscribeMutation();
  const [unsubscribe, { isLoading: isUnSubLoading }] = useUnsubscribeMutation();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<
    'success' | 'warning' | 'info'
  >('success');

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setIsSubscribed(data[0].status === '1');
    }
  }, [data]);

  const [showNotification, setShowNotification] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const lastAction = useRef<'subscribe' | 'unsubscribe' | null>(null);

  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsSubscribed(checked);

    try {
      if (checked) {
        lastAction.current = 'subscribe';
        await subscribe({ email, lang: locale }).unwrap();
      } else {
        lastAction.current = 'unsubscribe';
        await unsubscribe({ email, lang: locale }).unwrap();
      }

      setNotificationType('success');
      setNotificationMessage(
        checked ? t('subscriptionSuccess') : t('unsubscriptionSuccess')
      );
      setShowNotification(true);
      setFadeOut(false);

      const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
      const hideTimer = setTimeout(() => setShowNotification(false), 2500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    } catch (error) {
      console.error('Error updating subscription:', error);

      setIsSubscribed(!checked);

      setNotificationType('warning');
      setNotificationMessage(t('subscriptionError'));
      setShowNotification(true);
      setFadeOut(false);

      const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
      const hideTimer = setTimeout(() => setShowNotification(false), 2500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  };

  return (
    <AccountLayout nameSpace={'MyAccount'} spaceKey={'subscription'}>
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
              disabled={isSubLoading || isUnSubLoading}
              checked={isSubscribed}
              onChange={event =>
                handleSwitchChange(event, event.target.checked)
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
              <Notification type={notificationType} isVisible={fadeOut}>
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
        locale,
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
