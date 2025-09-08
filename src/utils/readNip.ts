import { BillingType, MetaDataType } from "@/types/services/wooCustomApi/customer";

export const readNip = (billing?: BillingType | null, metaData?: MetaDataType[] | null) => {
    const nipFromBilling = billing?.nip?.trim();
    if (nipFromBilling) return nipFromBilling;

    const nipFromMeta =
        metaData?.find(m => m.key === '_billing_nip')?.value?.trim() ||
        metaData?.find(m => m.key === 'nip')?.value?.trim();
    return nipFromMeta || '';
};