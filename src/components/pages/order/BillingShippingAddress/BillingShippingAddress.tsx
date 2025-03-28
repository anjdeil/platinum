import { useTranslations } from 'next-intl';
import { InfoLine } from './styles';
import { AddressType, MetaDataType } from '@/types/services/wooCustomApi/shop';

interface BillingShippingAdressProps {
  address: AddressType;
  additionalFields?: MetaDataType[];
};

const BillingShippingAddress: React.FC<BillingShippingAdressProps> = ({ address, additionalFields }) => {
  const t = useTranslations('MyAccount');
  return (
    <>
      {Object.entries(address).map(([key, value]) =>
          value !== '' && (
            <InfoLine key={key}>
              <span>{t(key)}</span>
              <span>{value}</span>
            </InfoLine>
          ),
      )}
      {Boolean(additionalFields?.length) && additionalFields?.map(({ key, value }) => (
          <InfoLine key={key}>
            <span>{t(key)}</span>
            <span>{value}</span>
          </InfoLine>
        ),
      )}
    </>

  );
};

export default BillingShippingAddress;