import { lineOrderItems } from "@/types/store/reducers/cartSlice";

const getSubtotalByLineItems = (lineItems: lineOrderItems[]): number =>
{
    let subtotal = 0;

    lineItems.forEach(item =>
    {
        const itemSubtotal = +item.subtotal;
        if (!Number.isNaN(itemSubtotal)) subtotal += itemSubtotal;
    });

    return subtotal;
}

export default getSubtotalByLineItems;