import { lineOrderItems } from '@/types/store/reducers/сartSlice';

const getTotalByLineItems = (lineItems: lineOrderItems[]): number => {
  let total = 0;

  lineItems.forEach(item => {
    const itemTotal = +item.total;
    if (!Number.isNaN(itemTotal)) total += itemTotal;
  });

  return total;
};

export default getTotalByLineItems;
