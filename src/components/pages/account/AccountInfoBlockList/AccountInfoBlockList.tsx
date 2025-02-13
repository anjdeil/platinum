import LoyaltyIcon from '@/components/global/icons/LoyaltyIcon/LoyaltyIcon';
import MoneyBagIcon from '@/components/global/icons/MoneyBagIcon/MoneyBagIcon';
import OrderIcon from '@/components/global/icons/OrderIcon/OrderIcon';
import { useAppSelector } from '@/store';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
import { AccountInfoBlockListProps } from '@/types/pages/account';
import { LOYALTY_LEVELS } from '@/utils/consts';
import { useTheme } from '@emotion/react';
import { useTranslations } from 'next-intl';
import AccountInfoBlock from '../AccountInfoBlock/AccountInfoBlock';
import { StyledListContainer } from './styles';

const AccountInfoBlockList: React.FC<AccountInfoBlockListProps> = ({
  orderCount,
  totalAmount,
  loyaltyProgram,
  isLoading,
}) => {
  const t = useTranslations('MyAccount');
  const theme = useTheme();

  const { data: currencies, isLoading: isCurrenciesLoading } =
    useGetCurrenciesQuery();
  const selectedCurrency = useAppSelector(state => state.currencySlice);

  const currentCurrency =
    currencies && !isCurrenciesLoading
      ? currencies?.data?.items.find(
          currency => currency.code === selectedCurrency.name
        )
      : undefined;

  const extendedCurrency = {
    ...selectedCurrency,
    rate: currentCurrency ? currentCurrency.rate || 1 : undefined,
  };

  const formatTotalAmount = (amount?: number, currencyCode?: string) => {
    if (amount === undefined || !extendedCurrency.rate) return undefined;
    return `${(amount * extendedCurrency.rate).toFixed(2)} ${currencyCode}`;
  };

  return (
    <StyledListContainer>
      <AccountInfoBlock
        icon={OrderIcon}
        title={t('numberOfOrders')}
        value={orderCount?.toString()}
        background={theme.background.infoGradient}
      />
      <AccountInfoBlock
        icon={MoneyBagIcon}
        title={t('totalOrderAmount')}
        value={formatTotalAmount(totalAmount, selectedCurrency.code)}
        background={theme.background.infoGradient}
      />
      {!isLoading ? (
        <AccountInfoBlock
          icon={LoyaltyIcon}
          title={loyaltyProgram ? t('loyaltyProgram') : t('missingToSilver')}
          value={
            loyaltyProgram
              ? loyaltyProgram
              : (
                  LOYALTY_LEVELS[0].amount - Math.floor(totalAmount || 0)
                ).toString()
          }
        />
      ) : (
        <AccountInfoBlock
          icon={LoyaltyIcon}
          title={t('loyaltyProgram')}
          value={''}
          background={theme.background.infoGradient}
        />
      )}
    </StyledListContainer>
  );
};

export default AccountInfoBlockList;
