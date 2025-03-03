import LoyaltyIcon from '@/components/global/icons/LoyaltyIcon/LoyaltyIcon';
import MoneyBagIcon from '@/components/global/icons/MoneyBagIcon/MoneyBagIcon';
import OrderIcon from '@/components/global/icons/OrderIcon/OrderIcon';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
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

  const {
    isLoading: isLoadingCurrency,
    convertCurrency,
    formatPrice,
  } = useCurrencyConverter();

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
        value={
          !isLoadingCurrency && totalAmount
            ? formatPrice(convertCurrency(totalAmount))
            : undefined
        }
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
