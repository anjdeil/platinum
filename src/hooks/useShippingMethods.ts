import {
  useGetShippingZonesQuery,
  useLazyGetShippingZoneLocationsQuery,
  useLazyGetShippingZoneMethodsQuery,
} from '@/store/rtk-queries/wooCustomApi';
import { ShippingMethodType } from '@/types/services';
import { useEffect, useState } from 'react';

type UseShippingMethodsResult = {
  shippingMethods: ShippingMethodType[];
  isLoading: boolean;
  isError: boolean;
};

export default function useShippingMethods(countryCode?: string, allowedShippingMethods?: string[]): UseShippingMethodsResult {
  const { data: shippingZones, isLoading: isShippingZonesLoading, isError } = useGetShippingZonesQuery();
  const [isShippingMethodsLoading, setIsShippingMethodsLoading] = useState(false);

  const [getShippingMethods] = useLazyGetShippingZoneMethodsQuery();
  const [getShippingLocations] = useLazyGetShippingZoneLocationsQuery();

  const [currentShippingMethods, setCurrentShippingMethods] = useState<ShippingMethodType[]>([]);

  useEffect(() => {
    if (!shippingZones || !countryCode) return;

    const getTargetShippingZoneId = async () => {
      setIsShippingMethodsLoading(true);
      let targetShippingZoneId: number = 0;

      for (const shippingZone of shippingZones) {
        const { data: locations = [] } = await getShippingLocations(shippingZone.id);
        if (locations.some(({ code }) => countryCode === code)) {
          targetShippingZoneId = shippingZone.id;
          break;
        }
      }

      if (!targetShippingZoneId) {
        setCurrentShippingMethods([]);
        setIsShippingMethodsLoading(false);
        return;
      }

      const { data: methods = [] } = await getShippingMethods(targetShippingZoneId);

      console.log('methods...', methods);

      const filteredMethods = allowedShippingMethods && allowedShippingMethods.length
        ? methods.filter(method => {
          const isInPost = method.title?.toLowerCase().includes('inpost');
          if (isInPost) {
            return allowedShippingMethods.some(allowed => allowed.includes(method.method_id));
          }
          return true;
        })
        : methods;

      setCurrentShippingMethods(filteredMethods);
      setIsShippingMethodsLoading(false);

    };

    getTargetShippingZoneId();
  }, [shippingZones, countryCode, allowedShippingMethods]);

  return {
    shippingMethods: currentShippingMethods,
    isLoading: isShippingZonesLoading || isShippingMethodsLoading,
    isError,
  };
}
