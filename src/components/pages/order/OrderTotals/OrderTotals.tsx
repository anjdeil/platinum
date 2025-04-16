import {
  ShippingMethodSelectorMethodLocker,
  ShippingMethodSelectorMethodLockerAddress,
  ShippingMethodSelectorMethodLockerDescription,
  ShippingMethodSelectorMethodLockerDetail,
  ShippingMethodSelectorMethodLockerName,
} from '@/components/pages/checkout/ShippingMethodSelector/style';
import { OrderType } from '@/types/services';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import parcelMachinesMethods from '@/utils/checkout/parcelMachinesMethods';
import { formatPrice } from '@/utils/price/formatPrice';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import OrderTotalsRowsSkeleton from './OrderTotalsRowsSkeleton';
import { Label, LastRow, Row, TotalsTable, Value } from './styles';
import { useAppSelector } from '@/store';
import {
  OrderCouponName,
  OrderCouponNamesBox,
  OrderSummaryLineName,
  OrderSummaryTotalTax,
  OrderSummaryTotalValue,
  OrderSummaryTotalWrapper,
} from '../../cart/OrderSummary/style';

interface OrderTotalsPropsType {
  order: OrderType | undefined | null;
  isLoading?: boolean;
}

const OrderTotals: FC<OrderTotalsPropsType> = ({
  order,
  isLoading = false,
}) => {
  const { address } = useAppSelector(
    state => state.themeOptions.data.item.contacts
  );

  const subtotal = order?.line_items
    ? getSubtotalByLineItems(order.line_items)
    : 0;
  const t = useTranslations('MyAccount');
  const tCart = useTranslations('Cart');
  const tShippingMethodSelector = useTranslations('ShippingMethodSelector');

  const formattedPrice = order?.total ? formatPrice(+order?.total) : '—';
  const formattedTax = order?.total_tax ? formatPrice(+order?.total_tax) : null;

  return (
    <TotalsTable>
      {isLoading ? (
        <OrderTotalsRowsSkeleton />
      ) : (
        <>
          <Row>
            <Label>{t('amount')}</Label>
            <Value>
              {formatPrice(subtotal)}&nbsp;{order?.currency_symbol}
            </Value>
          </Row>
          {order?.shipping_lines?.map(line => (
            <Row key={line.id}>
              <Label>{tShippingMethodSelector(line.method_title)}</Label>
              <Value>
                {formatPrice(+line.total)}&nbsp;{order?.currency_symbol}
              </Value>
              {parcelMachinesMethods.includes(line.method_id) && (
                <ShippingMethodSelectorMethodLocker>
                  <ShippingMethodSelectorMethodLockerDetail>
                    <ShippingMethodSelectorMethodLockerName>
                      {line?.meta_data && line.meta_data[0]?.value}
                    </ShippingMethodSelectorMethodLockerName>
                    <ShippingMethodSelectorMethodLockerAddress>
                      {line?.meta_data && line.meta_data[1]?.value}
                    </ShippingMethodSelectorMethodLockerAddress>
                    <ShippingMethodSelectorMethodLockerDescription>
                      {line?.meta_data && line.meta_data[2]?.value}
                    </ShippingMethodSelectorMethodLockerDescription>
                  </ShippingMethodSelectorMethodLockerDetail>
                </ShippingMethodSelectorMethodLocker>
              )}
              {line.method_id === 'local_pickup' && (
                <ShippingMethodSelectorMethodLocker>
                  <ShippingMethodSelectorMethodLockerDetail>
                    <ShippingMethodSelectorMethodLockerAddress>
                      {address}
                    </ShippingMethodSelectorMethodLockerAddress>
                  </ShippingMethodSelectorMethodLockerDetail>
                </ShippingMethodSelectorMethodLocker>
              )}
            </Row>
          ))}
          {/* {order?.coupon_lines?.map(line => {
            const name = `${t('discountCode')} ${
              line.discount_type === 'percent'
                ? `-${line.nominal_amount}% `
                : ''
            }`;
            return (
              <Row key={line.id}>
                <Label>
                  {name} <br />
                  <LabelCode>{line.code}</LabelCode>
                </Label>
                <Value>
                  - {`${formatPrice(+line.discount)} ${order?.currency_symbol}`}
                </Value>
              </Row>
            );
          })} */}
          {order?.coupon_lines?.map(line => {
            const name = `${t('discountCode')} ${
              line.discount_type === 'percent'
                ? `-${line.nominal_amount}% `
                : ''
            }`;
            const discountTotal = order
              ? +order.discount_total + +order.discount_tax
              : 0;

            return (
              <Row key={line.id}>
                <Label>
                  <OrderSummaryLineName>
                    {tCart('discount')}
                  </OrderSummaryLineName>
                  <OrderCouponNamesBox>
                    <OrderCouponName>
                      {name} {line.code}
                    </OrderCouponName>
                  </OrderCouponNamesBox>
                </Label>
                <Value>
                  – {`${formatPrice(discountTotal)} ${order?.currency_symbol}`}
                </Value>
              </Row>
            );
          })}
          {order?.fee_lines?.map(line => (
            <Row key={line.id}>
              <Label>{line.name}</Label>
              <Value>
                {formatPrice(+line.total)}&nbsp;{order?.currency_symbol}
              </Value>
            </Row>
          ))}
          {/* {order?.tax_lines?.map(line => (
            <Row key={line.id}>
              <Label>
                {line.label} ({line.rate_percent}%)
              </Label>
              <Value>
                {formatPrice(+line.tax_total)}&nbsp;{order?.currency_symbol}
              </Value>
            </Row>
          ))} */}
          <Row>
            <Label>{t('paymentMethod')}</Label>
            <Value>{order?.payment_method_title || '—'}</Value>
          </Row>
          <LastRow>
            <Label>{t('totalToPay')}</Label>
            <Value>
              <OrderSummaryTotalWrapper>
                <OrderSummaryTotalValue>
                  {formattedPrice} {order?.currency_symbol}
                </OrderSummaryTotalValue>
                {formattedTax && (
                  <OrderSummaryTotalTax>
                    {tCart('includesVat', {
                      cost: `${formattedTax} ${order?.currency_symbol}`,
                    })}
                  </OrderSummaryTotalTax>
                )}
              </OrderSummaryTotalWrapper>
            </Value>
          </LastRow>
        </>
      )}
    </TotalsTable>
  );
};

export default OrderTotals;
