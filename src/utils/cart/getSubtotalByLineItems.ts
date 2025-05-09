import { lineOrderItems } from '@/types/store/reducers/сartSlice';

const getSubtotalByLineItems = (lineItems: lineOrderItems[]): number => {
  let subtotal = 0;

  lineItems.forEach(item => {
    const itemSubtotal = +item.subtotal + +item.subtotal_tax;
    if (!Number.isNaN(itemSubtotal)) subtotal += itemSubtotal;
  });

  return subtotal;
};

export default getSubtotalByLineItems;
