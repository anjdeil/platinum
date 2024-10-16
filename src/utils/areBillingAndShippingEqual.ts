import { AddressType } from "@/types/services";

const areBillingAndShippingEqual = (billing: AddressType, shipping: AddressType) =>
{
    const keys: (keyof AddressType)[] = Object.keys(billing) as (keyof AddressType)[];
    for (const key of keys)
    {
        if (shipping[key] && billing[key] !== shipping[key])
        {
            return false;
        }
    }
    return true;
};

export default areBillingAndShippingEqual;