import AccountLayout from '@/components/pages/account/AccountLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Title } from '@/styles/components';
import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import theme from '@/styles/theme';
import wpRestApi from '@/services/wpRestApi';
import { decodeJwt } from 'jose';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import {
  LevelCodeText,
  LevelText,
  LoyalityBox,
  LoyalityLevelCard,
  LoyalityPageWrapper,
  NextLevelText,
} from '@/components/pages/account/Loyality/style';
import { BenefitsAccordion } from '@/components/pages/benefits/BenefitsAccordion';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { useAppSelector } from '@/store';
import { useFetchOrdersQuery } from '@/store/rtk-queries/wooCustomApi';
import { OrderType } from '@/types/services/wooCustomApi/shop';

export default function LoyaltyPage() {
  const t = useTranslations('MyAccount');

  const [
    fetchUserData,
    { data: userData, isFetching: isUserFetching, isError: isUserError },
  ] = useLazyFetchUserDataQuery();

  const {
    data: ordersData,
    isError: isOrdersError,
    refetch: fetchOrders,
  } = useFetchOrdersQuery(
    {
      customer: userData?.id,
    },
    { skip: !userData?.id }
  );

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData?.id) {
      fetchOrders();
    }
  }, [userData?.id, fetchOrders]);

  const { code } = useAppSelector(state => state.currencySlice);

  const loyaltyCode = userData?.meta?.loyalty?.toLowerCase();

  const levels = ['silver', 'gold', 'platinum'];
  const levelsSums = [2500, 10000, 20000];

  const currentLevelIndex = levels.findIndex(level => level === loyaltyCode);

  const nextLevel =
    currentLevelIndex !== -1 && currentLevelIndex < levels.length - 1
      ? levels[currentLevelIndex + 1]
      : loyaltyCode === ''
      ? levels[0]
      : null;

  const orderSum =
    ordersData?.reduce((sum: number, order: OrderType) => {
      if (order.status !== 'on-hold') {
        return sum + parseFloat(order.total);
      }
      return sum;
    }, 0) || 0;

  const amountToNextLevel =
    currentLevelIndex !== -1 && currentLevelIndex < levels.length - 1
      ? levelsSums[currentLevelIndex + 1] - orderSum
      : loyaltyCode === ''
      ? levelsSums[0] - orderSum
      : null;

  return (
    <AccountLayout title={t('loyalityProgram')}>
      {isUserError ||
        (isOrdersError && (
          <Notification type="info">{t('userInfoError')}</Notification>
        ))}
      {isUserFetching ? (
        <MenuSkeleton
          elements={1}
          direction="column"
          width="100%"
          height="84px"
          gap="8px"
          color={theme.background.skeletonSecondary}
        />
      ) : (
        <LoyalityPageWrapper>
          {userData && (
            <LoyalityLevelCard isColumn={nextLevel === 'silver' && true}>
              <LevelText>
                {loyaltyCode ? (
                  <>{t('currentLevel')}</>
                ) : (
                  <>{t('loyaltyLevelNotEarned')}</>
                )}
              </LevelText>
              <LoyalityBox>
                <LevelCodeText>{loyaltyCode && t(loyaltyCode)}</LevelCodeText>
                {nextLevel && amountToNextLevel && (
                  <NextLevelText>
                    {t('nextLevelInfo', {
                      amount: amountToNextLevel.toFixed(0),
                      code,
                      nextLevel: t(nextLevel),
                    })}
                  </NextLevelText>
                )}
              </LoyalityBox>
            </LoyalityLevelCard>
          )}

          <Title
            display="inline-block"
            as="h2"
            textalign="left"
            marginBottom="16px"
          >
            {t('levelBenefits')}
          </Title>
          <BenefitsAccordion />
        </LoyalityPageWrapper>
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
    if (!cookies?.authToken) {
      return {
        redirect: {
          destination: '/my-account/login',
          permanent: false,
        },
      };
    }

    const authResp = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );
    if (authResp?.data?.code !== 'jwt_auth_valid_token') {
      return {
        redirect: {
          destination: '/my-account/login',
          permanent: false,
        },
      };
    }
    const jwtDecodedData = decodeJwt(cookies.authToken) as JwtDecodedDataType;
    const isJwtDecodedDataValid = await validateJwtDecode(jwtDecodedData);
    if (!isJwtDecodedDataValid) {
      return {
        redirect: {
          destination: '/my-account/login',
          permanent: false,
        },
      };
    }
    return {
      props: {},
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
