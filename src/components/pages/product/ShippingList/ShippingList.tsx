import FreeDeliveryIcon from '@/components/global/icons/FreeDeliveryIcon/FreeDeliveryIcon';
import ShippingIcon from '@/components/global/icons/ShippingIcon/ShippingIcon';
import { useAppSelector } from '@/store';
import { useTranslations } from 'next-intl';
import { ShippingItem, ShippingListContainer, ShippingTitle } from './styles';

const ShippingList = () => {
  const t = useTranslations('Product');
  const currency = useAppSelector(state => state.currencySlice);

  return (
    <ShippingListContainer>
      <ShippingItem>
        <ShippingIcon />
        <ShippingTitle>{t('fastShipping')}</ShippingTitle>
      </ShippingItem>
      <ShippingItem>
        <FreeDeliveryIcon />
        <ShippingTitle>
          {`${t('freeDeliveryOver', { price: 200 })}\u00A0${currency.code}`}
        </ShippingTitle>
      </ShippingItem>
    </ShippingListContainer>
  );
};

export default ShippingList;
