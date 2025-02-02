import LoyaltyIcon from '@/components/global/icons/LoyaltyIcon/LoyaltyIcon';
import MoneyBagIcon from '@/components/global/icons/MoneyBagIcon/MoneyBagIcon';
import OrderIcon from '@/components/global/icons/OrderIcon/OrderIcon';
import { useAppSelector } from '@/store';
import { AccountInfoBlockListProps } from '@/types/pages/account';
import { MIN_TOTAL_TO_SILVER } from '@/utils/consts';
import { useTheme } from '@emotion/react';
import { useTranslations } from 'next-intl';
import AccountInfoBlock from '../AccountInfoBlock/AccountInfoBlock';
import { StyledListContainer } from './styles';

const AccountInfoBlockList: React.FC<AccountInfoBlockListProps> = ({
  orderCount,
  totalAmount,
  loyaltyProgram,
}) => {
  const t = useTranslations('MyAccount');
  const theme = useTheme();

  const currency = useAppSelector(state => state.currencySlice);

  const formatTotalAmount = (amount?: number, currencyCode?: string) => {
    if (amount === undefined) return undefined;
    return `${amount} ${currencyCode}`;
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
        value={formatTotalAmount(totalAmount, currency.code)}
        background={theme.background.infoGradient}
      />
      <AccountInfoBlock
        icon={LoyaltyIcon}
        title={loyaltyProgram ? t('loyaltyProgram') : t('missingToSilver')}
        value={
          loyaltyProgram
            ? loyaltyProgram
            : (MIN_TOTAL_TO_SILVER - Math.floor(totalAmount || 0)).toString()
        }
      />
    </StyledListContainer>
  );
};

export default AccountInfoBlockList;
