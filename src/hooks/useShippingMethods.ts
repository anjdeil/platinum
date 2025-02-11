import { useGetShippingZonesQuery, useLazyGetShippingZoneLocationsQuery, useLazyGetShippingZoneMethodsQuery } from "@/store/rtk-queries/wooCustomApi";
import { ShippingsType } from "@/types/pages/checkout";
import { ShippingMethodType } from "@/types/services";
import { useEffect, useState } from "react";

type UseShippingMethodsResult = {
    shippingMethods: ShippingMethodType[];
    isLoading: boolean;
    isError: boolean;
};

export default function useShippingMethods(countryCode?: string): UseShippingMethodsResult {
    const { data: shippingZones, isLoading: isShippingZonesLoading, isError } = useGetShippingZonesQuery();

    const [getShippingMethods, { isLoading: ishippingMethodsLoading }] = useLazyGetShippingZoneMethodsQuery();
    const [getShippingLocations, { isLoading: isShippingLocationsLoading }] = useLazyGetShippingZoneLocationsQuery();

    const [shippings, setShippings] = useState<ShippingsType[]>([]);
    const [currentShippingMethods, setCurrentShippingMethods] = useState<ShippingMethodType[]>([]);


    useEffect(() => {
        const fetchShippingMethodsAndLocations = async () => {
            if (!shippingZones?.length) return;

            let updatedShippings = await Promise.all(
                shippingZones.map(async (shippingZone) => {
                    const { data: methods = [] } = await getShippingMethods(shippingZone.id);
                    const { data: locations = [] } = await getShippingLocations(shippingZone.id);

                    return { ...shippingZone, methods, locations };
                })
            );

            updatedShippings = updatedShippings.filter(({ methods }) => methods.length);

            setShippings(updatedShippings);
        }

        fetchShippingMethodsAndLocations()
    }, [shippingZones]);


    useEffect(() => {
        if (!shippings?.length || !countryCode) return;

        const currentShipping = shippings.find(({ locations }) =>
            locations.some(({ code }) => countryCode === code)
        );

        const shippingMethods = currentShipping ? currentShipping.methods : [];

        setCurrentShippingMethods(shippingMethods);


    }, [shippings, countryCode]);

    return {
        shippingMethods: currentShippingMethods,
        isLoading: isShippingZonesLoading || ishippingMethodsLoading || isShippingLocationsLoading,
        isError
    };
}
