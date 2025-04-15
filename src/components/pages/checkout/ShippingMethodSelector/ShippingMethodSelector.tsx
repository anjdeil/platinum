import { useTranslations } from 'next-intl';
import {
  ShippingMethodSelectorLabel,
  ShippingMethodSelectorMethod,
  ShippingMethodSelectorMethodContent,
  ShippingMethodSelectorMethodCost, ShippingMethodSelectorMethodDescription,
  ShippingMethodSelectorMethodDetail,
  ShippingMethodSelectorMethodLocker,
  ShippingMethodSelectorMethodLockerAddress,
  ShippingMethodSelectorMethodLockerChangeButton,
  ShippingMethodSelectorMethodLockerDescription,
  ShippingMethodSelectorMethodLockerDetail,
  ShippingMethodSelectorMethodLockerName,
  ShippingMethodSelectorMethodLockerWrapper,
  ShippingMethodSelectorMethodName,
  ShippingMethodSelectorMethodNaming,
  ShippingMethodSelectorMethodRadio,
  ShippingMethodSelectorMethodRadioBox,
  ShippingMethodSelectorMethods,
  ShippingMethodSelectorNotification,
} from './style';
import { ShippingMethodType } from '@/types/services';
import ShippingMethodSelectorSkeleton from './ShippingMethodSelectorSkeleton';
import { ParcelMachineType } from '@/types/pages/checkout';
import { CustomRequired } from '@/components/global/forms/CustomFormInput/styles';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { useAppSelector } from '@/store';

const inpostMethodsIds = ['easypack_parcel_machines', 'easypack_shipping_courier', 'easypack_cod_shipping_courier'];

export default function ShippingMethodSelector({
                                                 methods,
                                                 isLoading,
                                                 currentMethodId,
                                                 onChange,
                                                 parcelMachinesMethods,
                                                 parcelMachine,
                                                 onParcelMachineChange,
                                                 getCalculatedMethodCost,
                                               }: {
  methods: ShippingMethodType[],
  isLoading: boolean,
  currentMethodId?: string,
  onChange: (shippingMethod: ShippingMethodType) => void,
  parcelMachinesMethods: string[],
  parcelMachine?: ParcelMachineType,
  onParcelMachineChange: (methodId: string) => void,
  getCalculatedMethodCost: (method: ShippingMethodType) => number
}) {
  const t = useTranslations('ShippingMethodSelector');
  const { convertCurrency, currencyCode } = useCurrencyConverter();

  const {address} = useAppSelector(state => state.themeOptions.data.item.contacts);

  const handleChangeShippingMethod = (method: ShippingMethodType) => {
    onChange(method);
  };

  const isParcelMachineCollapsed = (methodId: string) => {
    return currentMethodId === methodId && parcelMachinesMethods.includes(methodId);
  };

  return (
    <>
      {isLoading ? (
        <ShippingMethodSelectorSkeleton />
      ) : Boolean(methods.length) ? (
        <ShippingMethodSelectorMethods>
          {methods.map(method => (
            <ShippingMethodSelectorMethod key={method.method_id}>
              <ShippingMethodSelectorMethodRadio
                type="radio"
                name="shippingMethod"
                value={method.method_id}
                checked={currentMethodId === method.method_id}
                onChange={() => handleChangeShippingMethod(method)}
              />
              <ShippingMethodSelectorMethodContent className="ShippingMethodSelectorMethodContent">
                <ShippingMethodSelectorMethodDetail>
                  <ShippingMethodSelectorMethodRadioBox className="ShippingMethodSelectorMethodRadioBox" />
                  <ShippingMethodSelectorMethodNaming>
                    <ShippingMethodSelectorMethodName>
                      {t(method.title)}
                    </ShippingMethodSelectorMethodName>
                    {inpostMethodsIds.includes(method.method_id) &&
                      <ShippingMethodSelectorMethodDescription>{t('deliveryEstimate')}</ShippingMethodSelectorMethodDescription>
                    }
                    {method.method_id === 'local_pickup' &&
                      <ShippingMethodSelectorMethodDescription>{address}</ShippingMethodSelectorMethodDescription>
                    }
                  </ShippingMethodSelectorMethodNaming>
                  <ShippingMethodSelectorMethodCost>
                    {convertCurrency(getCalculatedMethodCost(method))}{' '}
                    {currencyCode}
                  </ShippingMethodSelectorMethodCost>
                </ShippingMethodSelectorMethodDetail>
                {isParcelMachineCollapsed(method.method_id) && (
                  <ShippingMethodSelectorMethodLockerWrapper>
                    {parcelMachine?.methodId === method.method_id ? (
                      <ShippingMethodSelectorMethodLocker>
                        <ShippingMethodSelectorMethodLockerDetail>
                          <ShippingMethodSelectorMethodLockerName>
                            {parcelMachine.choosenParcelMachine.name}
                          </ShippingMethodSelectorMethodLockerName>
                          <ShippingMethodSelectorMethodLockerAddress>
                            {parcelMachine.choosenParcelMachine.address}
                          </ShippingMethodSelectorMethodLockerAddress>
                          <ShippingMethodSelectorMethodLockerDescription>
                            {parcelMachine.choosenParcelMachine.description}
                          </ShippingMethodSelectorMethodLockerDescription>
                        </ShippingMethodSelectorMethodLockerDetail>
                        <ShippingMethodSelectorMethodLockerChangeButton
                          onClick={() =>
                            onParcelMachineChange(method.method_id)
                          }
                        >
                          {t('change')}
                        </ShippingMethodSelectorMethodLockerChangeButton>
                      </ShippingMethodSelectorMethodLocker>
                    ) : (
                      <>
                        <ShippingMethodSelectorLabel>
                          {t('parcelLocker')} <CustomRequired>*</CustomRequired>
                        </ShippingMethodSelectorLabel>
                        <ShippingMethodSelectorMethodLockerChangeButton
                          onClick={() =>
                            onParcelMachineChange(method.method_id)
                          }
                        >
                          {t('selectParcelLocker')}
                        </ShippingMethodSelectorMethodLockerChangeButton>
                      </>
                    )}
                  </ShippingMethodSelectorMethodLockerWrapper>
                )}
              </ShippingMethodSelectorMethodContent>
            </ShippingMethodSelectorMethod>
          ))}
        </ShippingMethodSelectorMethods>
      ) : (
        <ShippingMethodSelectorNotification>
          {t('deliveryUnavailable')}
        </ShippingMethodSelectorNotification>
      )}
    </>
  );
}
