import { OrderType } from '@/types/services';
import { lineOrderItems } from '@/types/store/reducers/cartSlice';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import { formatPrice } from '@/utils/price/formatPrice';
import { uniteOptionsIntoString } from '@/utils/uniteOptionsIntoString';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
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
  name: {
    fontSize: 12,
    width: '90%',
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
    width: '45%',
  },
  productTableColumnMiddle: {
    width: '20%',
    textAlign: 'center',
  },
  productTableColumnRight: {
    width: '20%',
    textAlign: 'right',
  },
  productTableColumnQUantity: {
    width: '15%',
    textAlign: 'center',
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
    textAlign: 'left',
    fontSize: 10,
    opacity: 0.3,
  },
  splitLast: {
    width: '50%',
    textAlign: 'right',
  },
});

const OrderPdf = ({ order }: { order: OrderType }) => {
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>{`Zamówienie #${order?.id}`}</Text>
        </View>

        <View style={styles.productTable}>
          <View style={styles.productTableHead}>
            <View style={styles.productTableRow}>
              <View style={styles.productTableTwoColumn}>
                <Text style={styles.text}>Nazwa produktu</Text>
              </View>
              <View style={styles.productTableColumnMiddle}>
                <Text style={styles.text}>Cena</Text>
              </View>
              <View style={styles.productTableColumnQUantity}>
                <Text style={styles.text}>Ilość</Text>
              </View>
              <View style={styles.productTableColumnRight}>
                <Text style={styles.text}>Razem</Text>
              </View>
            </View>
          </View>

          <View>
            {order?.line_items?.map(item => (
              <View key={item.id} style={styles.productTableRow}>
                <View style={styles.productTableTwoColumn}>
                  <Text style={styles.name}>
                    {item.name}
                    {uniteOptionsIntoString(item.meta_data) !== '' &&
                      ` - ${uniteOptionsIntoString(item.meta_data)}`}
                  </Text>
                  <View style={styles.splitMiddle}>
                    <Text style={styles.text}>{item.sku}</Text>
                  </View>
                </View>
                <View style={styles.productTableColumnMiddle}>
                  <Text style={styles.text}>
                    {getItemUnitPrice(item)} {order.currency}
                  </Text>
                </View>
                <View style={styles.productTableColumnQUantity}>
                  <Text style={styles.text}>{item.quantity}</Text>
                </View>
                <View style={styles.productTableColumnRight}>
                  <Text style={styles.text}>
                    {getItemTotalPrice(item)} {order.currency}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.island}>
          <Text style={styles.secondaryTitle}>Podsumowanie zamówienia</Text>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>Kwota</Text>
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
            const name = `Kupon ${
              line.discount_type === 'percent'
                ? `-${line.nominal_amount}% `
                : ''
            }`;
            return (
              <React.Fragment key={line.id}>
                <View style={styles.split}>
                  <View style={styles.splitFirst}>
                    <Text style={styles.text}>Rabat</Text>
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

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>Metoda płatności</Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.payment_method_title || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>Razem</Text>
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
                {`(zawiera ${formattedTax} ${order?.currency_symbol}  VAT)`}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPdf;
