import OrderProgress from '@/components/pages/cart/OrderProgress/OrderProgress';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { CheckoutContainer, CheckoutFormsWrapper, CheckoutSummaryWrapper } from './style';
import ShippingMethodSelector from '@/components/pages/checkout/ShippingMethodSelector/ShippingMethodSelector';
import useShippingMethods from '@/hooks/useShippingMethods';
import { ParcelMachineType } from '@/types/pages/checkout';
import useInPostGeowidget from '@/hooks/useInPostGeowidget';
import { ShippingMethodType } from '@/types/services';
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import { useAppSelector } from '@/store';

const parcelMachinesMethods = ['easypack_parcel_machines'];

export default function CheckoutPage() {
  const { InPostHead, InPostGeowidget, pointDetail } = useInPostGeowidget();
  const [isGeowidgetShown, setGeowidgetShown] = useState(false);
  const [parcelMachine, setParcelMachine] = useState<ParcelMachineType>();

  const [currentCountryCode, setCurrentCountryCode] = useState<string>();
  const { shippingMethods, isLoading, isError } = useShippingMethods(currentCountryCode);
  const [choosenShippingMethod, setShippingMethod] = useState<ShippingMethodType>();

  /**
   * Order logic
   */
  const { cartItems, couponCodes } = useAppSelector(state => state.cartSlice);
  const [createOrder, { data: order, isLoading: isOrderLoading }] = useCreateOrderMutation();
  const [getProductsMinimized, {
    data: productsMinimized,
    isLoading: isProductsMinimizedLoading,
    error: isProductsMinimizedError,
  }] = useGetProductsMinimizedMutation();

  const handleParcelMachineChange = (methodId: string) => {
    switch (methodId) {
      case 'easypack_parcel_machines':
        setGeowidgetShown(true);
        break;
    }
  };

  useEffect(() => {
    if (pointDetail) {
      setParcelMachine({
        methodId: 'easypack_parcel_machines',
        choosenParcelMachine: {
          name: pointDetail.name,
          address: Object.values(pointDetail.address).join(', '),
          description: pointDetail.location_description,
        },
      });

      setGeowidgetShown(false);

    }
  }, [pointDetail]);


  return (
    <>
      <Head>
        <InPostHead />
      </Head>
      <OrderProgress />

      <CheckoutContainer>
        <CheckoutFormsWrapper>
          {/* Delete 3 strings bellow after forms implemented */}
          <button onClick={() => setCurrentCountryCode('PL')}>Set "PL"</button>
          <button onClick={() => setCurrentCountryCode('US')}>Set "US"</button>
          <button onClick={() => setCurrentCountryCode('Bla-bla')}>Set "Bla-bla"</button>

          <ShippingMethodSelector
            methods={shippingMethods}
            isLoading={isLoading}
            parcelMachinesMethods={parcelMachinesMethods}
            parcelMachine={parcelMachine}
            onParcelMachineChange={handleParcelMachineChange}
          />
        </CheckoutFormsWrapper>
        <CheckoutSummaryWrapper>
        </CheckoutSummaryWrapper>
      </CheckoutContainer>

      {isGeowidgetShown &&
        <div style={{ height: 1000 }}>
          <InPostGeowidget onClose={() => setGeowidgetShown(false)} />
        </div>
      }
    </>
  );
}