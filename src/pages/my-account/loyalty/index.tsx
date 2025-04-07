import Notification from '@/components/global/Notification/Notification';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import AccountLayout from '@/components/pages/account/AccountLayout';
import {
  LevelCodeText,
  LevelText,
  LoyalityBox,
  LoyalityLevelCard,
  LoyalityPageWrapper,
  NextLevelText,
} from '@/components/pages/account/Loyality/style';
import { BenefitsAccordion } from '@/components/pages/benefits/BenefitsAccordion';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import wpRestApi from '@/services/wpRestApi';
import { useGetUserTotalsQuery } from '@/store/rtk-queries/userTotals/userTotals';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { AccountTitle, Title } from '@/styles/components';
import theme from '@/styles/theme';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { LOYALTY_LEVELS } from '@/utils/consts';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function LoyaltyPage() {
  const t = useTranslations('MyAccount');

  const [
    fetchUserData,
    { data: userData, isFetching: isUserFetching, isError: isUserError },
  ] = useLazyFetchUserDataQuery();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const { data: userTotal, isLoading } = useGetUserTotalsQuery(userData?.id, {
    skip: !userData?.id,
  });

  const { convertCurrency, currencyCode: code } = useCurrencyConverter();

  const level = userTotal?.loyalty_status;
  const nextLevelAmount = userTotal?.remaining_amount;

  const currentLevelIndex = LOYALTY_LEVELS.findIndex(
    loyaltyLevel => loyaltyLevel.name === level
  );

  const nextLevel =
    currentLevelIndex !== -1 && currentLevelIndex < LOYALTY_LEVELS.length - 1
      ? LOYALTY_LEVELS[currentLevelIndex + 1]
      : !level
      ? LOYALTY_LEVELS[0]
      : null;

  return (
    <AccountLayout>
      <AccountTitle as={'h1'} textalign="center" uppercase marginBottom="24">
        {t('loyaltyProgram')}
      </AccountTitle>
      {isUserError && (
        <Notification type="info">{t('userInfoError')}</Notification>
      )}
      {isUserFetching || isLoading ? (
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
          {userTotal && (
            <LoyalityLevelCard isColumn={!level}>
              <div>
                <LevelText>
                  {level ? (
                    <>{t('currentLevel')}</>
                  ) : (
                    <>{t('loyaltyLevelNotEarned')}</>
                  )}
                </LevelText>
                <LoyalityBox>
                  <LevelCodeText>{level}</LevelCodeText>
                </LoyalityBox>
              </div>

              {nextLevel && nextLevelAmount && (
                <NextLevelText>
                  {t('nextLevelInfo', {
                    amount: convertCurrency(+nextLevelAmount),
                    code,
                    nextLevel: nextLevel.name,
                  })}
                </NextLevelText>
              )}
            </LoyalityLevelCard>
          )}

          <Title
            display="inline-block"
            as="h2"
            textalign="left"
            marginBottom="16px"
            uppercase
            mobTextalign="center"
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
