import { OrderType } from '@/types/services';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { formatPrice } from '@/utils/price/formatPrice';
import { lineOrderItems } from '@/types/store/reducers/сartSlice';
import { getMetaDataValue } from '@/utils/myAcc/getMetaDataValue';
import React from 'react';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    width: '100%',
    padding: '70px 50px',
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 15,
  },
  notification: {
    marginBottom: 15,
  },
  productTableHead: {
    opacity: 0.5,
  },
  productTableRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 6,
  },
  productTableTwoColumn: {
    width: '40%',
  },
  productTableColumn: {
    width: '20%',
    textalign: 'right',
  },
  productImage: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    objectPosition: 'center',
  },
  productTable: {
    marginBottom: 15,
  },
  island: {
    width: '100%',
    marginBottom: 15,
  },
  secondaryTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  split: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  splitFirst: {
    width: '50%',
    opacity: 0.5,
  },
  splitMiddle: {
    width: '100%',
    textalign: 'left',
    fontSize: 10,
    opacity: 0.3,
  },
  splitLast: {
    width: '50%',
    textalign: 'right',
  },
});

const OrderPdf = ({
  order,
  t,
}: {
  order: OrderType;
  t: (string: string, props?: Record<string, string>) => string;
}) => {
  const date = new Date(order?.date_created);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const subtotal = order?.line_items
    ? getSubtotalByLineItems(order.line_items)
    : 0;

  const getItemUnitPrice = (item: lineOrderItems): string => {
    return formatPrice((+item.subtotal + +item.subtotal_tax) / item.quantity);
  };

  const getItemTotalPrice = (item: lineOrderItems): string => {
    return formatPrice(+item.subtotal + +item.subtotal_tax);
  };

  const discountTotal = order ? +order.discount_total + +order.discount_tax : 0;
  const formattedPrice = order?.total ? formatPrice(+order?.total) : '—';
  const formattedTax = order?.total_tax ? formatPrice(+order?.total_tax) : null;

  const nipFromMeta = order ? getMetaDataValue(order.meta_data, 'nip') : '';

  const isShippingData = () => {
    if (!order?.shipping) return false;
    return Object.values(order?.shipping).some(
      value => value && value.trim() !== ''
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>{`${t('order')} #${order?.id}`}</Text>
        </View>

        <View style={styles.notification}>
          <Text style={styles.text}>
            {t('orderWasPlaced', {
              date: formattedDate,
              status: order?.status,
            })}
          </Text>
        </View>

        <View style={styles.productTable}>
          <View style={styles.productTableHead}>
            <View style={styles.productTableRow}>
              <View style={styles.productTableTwoColumn}>
                <Text style={styles.text}>{t('productName')}</Text>
              </View>
              <View style={styles.productTableColumn}>
                <Text style={styles.text}>{t('price')}</Text>
              </View>
              <View style={styles.productTableColumn}>
                <Text style={styles.text}>{t('quantity')}</Text>
              </View>
              <View style={styles.productTableColumn}>
                <Text style={styles.text}>{t('total')}</Text>
              </View>
            </View>
          </View>

          <View>
            {order?.line_items?.map(item => (
              <View key={item.id} style={styles.productTableRow}>
                <View style={styles.productTableTwoColumn}>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
                <View style={styles.productTableColumn}>
                  <Text style={styles.text}>
                    {getItemUnitPrice(item)} {order.currency}
                  </Text>
                </View>
                <View style={styles.productTableColumn}>
                  <Text style={styles.text}>{item.quantity}</Text>
                </View>
                <View style={styles.productTableColumn}>
                  <Text style={styles.text}>
                    {getItemTotalPrice(item)} {order.currency}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.island}>
          <Text style={styles.secondaryTitle}>{t('summaryOrder')}</Text>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('orderValue')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {formatPrice(subtotal)} {order?.currency}
              </Text>
            </View>
          </View>

          {order?.shipping_lines?.map(line => (
            <View key={line.id} style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{line.method_title}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {formatPrice(+line.total)} {order?.currency}
                </Text>
              </View>
            </View>
          ))}

          {order?.coupon_lines?.map(line => {
            const name = `${t('coupon')} ${
              line.discount_type === 'percent'
                ? `-${line.nominal_amount}% `
                : ''
            }`;
            return (
              <React.Fragment key={line.id}>
                <View style={styles.split}>
                  <View style={styles.splitFirst}>
                    <Text style={styles.text}>{t('discount')}</Text>
                  </View>

                  <View style={styles.splitLast}>
                    <Text style={styles.text}>
                      {formatPrice(discountTotal)} {order?.currency}
                    </Text>
                  </View>
                </View>

                <View style={styles.split}>
                  <View style={styles.splitMiddle}>
                    <Text style={styles.text}>
                      {name}
                      {line.code}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            );
          })}

          {order?.fee_lines?.map(line => (
            <View key={line.id} style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{line.name}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {formatPrice(+line.total)} {order?.currency}
                </Text>
              </View>
            </View>
          ))}

          {/* {order?.tax_lines?.map(line => (
            <View key={line.id} style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>
                  {line.label} ({line.rate_percent}%)
                </Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {formatPrice(+line.tax_total)} {order?.currency}
                </Text>
              </View>
            </View>
          ))} */}

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('paymentMethod')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.payment_method_title || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('total')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {formattedPrice} {order?.currency_symbol}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitMiddle}>
              <Text style={styles.text}>
                {t('includesVat', {
                  cost: `${formattedTax} ${order?.currency_symbol}`,
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Billings */}
        <View style={styles.island}>
          <Text style={styles.secondaryTitle}>{t('billing')}</Text>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('first_name')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.first_name || order?.billing?.last_name
                  ? `${order?.billing.first_name} ${order?.billing.last_name}`
                  : '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('address_1')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.address_1 || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('apartmentNumber')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.address_2 || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('city')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>{order?.billing?.city || '—'}</Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('postcode')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>{order?.billing?.postcode || '—'}</Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('country')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>{order?.billing?.country || '—'}</Text>
            </View>
          </View>

          {Boolean(order?.billing?.state) && (
            <View style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{t('state')}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>{order?.billing?.state || '—'}</Text>
              </View>
            </View>
          )}

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('email')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.email ? (
                  <Link src={`mailto:${order?.billing.email}`}>
                    {order?.billing.email}
                  </Link>
                ) : (
                  '—'
                )}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('phone')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.phone ? (
                  <Link src={`tel:${order?.billing.phone}`}>
                    {order?.billing.phone}
                  </Link>
                ) : (
                  '—'
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.split}>
          <View style={styles.splitFirst}>
            <Text style={styles.text}>{t('company')}</Text>
          </View>
          <View style={styles.splitLast}>
            <Text style={styles.text}>{order?.billing?.company || '—'}</Text>
          </View>
        </View>

        {Boolean(nipFromMeta) && (
          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>{t('nip')}</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>{nipFromMeta || '—'}</Text>
            </View>
          </View>
        )}

        {/* Shipping */}
        {order?.shipping && isShippingData() && (
          <View style={styles.island}>
            <Text style={styles.secondaryTitle}>{t('shipping')}</Text>

            <View style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{t('first_name')}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {order?.shipping?.first_name || order?.shipping?.last_name
                    ? `${order?.shipping.first_name} ${order?.shipping.last_name}`
                    : '—'}
                </Text>
              </View>
            </View>

            {Boolean(order?.shipping?.company) && (
              <View style={styles.split}>
                <View style={styles.splitFirst}>
                  <Text style={styles.text}>{t('company')}</Text>
                </View>
                <View style={styles.splitLast}>
                  <Text style={styles.text}>
                    {order?.shipping?.company || '—'}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{t('address_1')}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {order?.shipping?.address_1 || '—'}
                </Text>
              </View>
            </View>

            <View style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{t('shipping_apartmentNumber')}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {order?.shipping?.address_2 || '—'}
                </Text>
              </View>
            </View>

            <View style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{t('city')}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>{order?.shipping?.city || '—'}</Text>
              </View>
            </View>

            <View style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{t('postcode')}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {order?.shipping?.postcode || '—'}
                </Text>
              </View>
            </View>

            <View style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>{t('country')}</Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {order?.shipping?.country || '—'}
                </Text>
              </View>
            </View>

            {Boolean(order?.shipping?.state) && (
              <View style={styles.split}>
                <View style={styles.splitFirst}>
                  <Text style={styles.text}>{t('state')}</Text>
                </View>
                <View style={styles.splitLast}>
                  <Text style={styles.text}>
                    {order?.shipping?.state || '—'}
                  </Text>
                </View>
              </View>
            )}

            {Boolean(order?.shipping?.email) && (
              <View style={styles.split}>
                <View style={styles.splitFirst}>
                  <Text style={styles.text}>{t('email')}</Text>
                </View>
                <View style={styles.splitLast}>
                  <Text style={styles.text}>
                    {order?.shipping?.email ? (
                      <Link src={`mailto:${order?.shipping.email}`}>
                        {order?.shipping.email}
                      </Link>
                    ) : (
                      '—'
                    )}
                  </Text>
                </View>
              </View>
            )}

            {Boolean(order?.shipping?.phone) && (
              <View style={styles.split}>
                <View style={styles.splitFirst}>
                  <Text style={styles.text}>{t('phone')}</Text>
                </View>
                <View style={styles.splitLast}>
                  <Text style={styles.text}>
                    {order?.shipping?.phone ? (
                      <Link src={`tel:${order?.shipping.phone}`}>
                        {order?.shipping.phone}
                      </Link>
                    ) : (
                      '—'
                    )}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default OrderPdf;
