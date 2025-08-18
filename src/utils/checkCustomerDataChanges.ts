import { WooCustomerType } from '@/types/services';
import {
  BillingType,
  MetaDataType,
  ShippingType,
} from '@/types/services/wooCustomApi/customer';
import { readNip } from './readNip';

type BillingChangeResult = {
  isCompanyChanged: boolean;
  isNipChanged: boolean;
  hasChanges: boolean;
};

function checkCustomerDataChanges(
  formBilling: BillingType,
  formShipping: ShippingType,
  formOrderDataMeta: MetaDataType[],
  customer: WooCustomerType,
  isInvoice: boolean,
  isShippingAddressDifferent: boolean
): BillingChangeResult {
  if (!customer?.billing || !customer?.shipping) {
    return {
      isCompanyChanged: isInvoice,
      isNipChanged: isInvoice,
      hasChanges: true,
    };
  }

  const isBillingChanged = Object.keys(formBilling).some(key => {
    if (key === 'company' || key === 'nip') return false;

    const formValue = formBilling[key as keyof BillingType];
    const customerValue = customer.billing[key as keyof BillingType];

    if (formValue === undefined || formValue === '') return false;

    return String(formValue) !== String(customerValue);
  });

  const isCompanyChanged =
    isInvoice && formBilling.company !== customer.billing.company;

  const nipFromForm = readNip(formBilling, formOrderDataMeta);
  const nipFromCustomer = readNip(customer.billing as any, customer.meta_data || []);
  const isNipChanged = isInvoice && (nipFromForm !== nipFromCustomer);

  const isShippingChanged = isShippingAddressDifferent
    ? Object.keys(formShipping).some(key => {
      const formValue = formShipping[key as keyof ShippingType];
      const customerValue = customer.shipping[key as keyof ShippingType];

      if (formValue === undefined || formValue === '') return false;

      return String(formValue) !== String(customerValue);
    })
    : false;

  const hasChanges =
    isBillingChanged ||
    isShippingChanged ||
    (isInvoice && (isCompanyChanged || isNipChanged));

  return {
    isCompanyChanged,
    isNipChanged,
    hasChanges,
  };
}

export default checkCustomerDataChanges;
