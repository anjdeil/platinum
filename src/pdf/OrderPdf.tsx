import { OrderType } from '@/types/services';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { formatPrice } from '@/utils/price/formatPrice';

Font.register({
  family: 'Roboto',
  src:
    'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: '70px 50px', fontFamily: 'Roboto',
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
    opacity: .5,
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
    marginBottom: 15,
  },
  secondaryTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  split: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 6,
  },
  splitFirst: {
    width: '50%',
    opacity: .5,
  },
  splitLast: {
    width: '50%',
    textalign: 'right',
  },
});


const OrderPdf = ({ order, t }: {
  order: OrderType,
  t: (string: string, props?: Record<string, string>) => string
}) => {

  const date = new Date(order?.date_created);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const subtotal = order?.line_items ? getSubtotalByLineItems(order.line_items) : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>{`${t('order')} #${order?.id}`}</Text>
        </View>

        <View style={styles.notification}>
          <Text style={styles.text}>
            {t('orderWasPlaced', { date: formattedDate, status: order?.status })}
          </Text>
        </View>

        <View style={styles.productTable}>
          <View style={styles.productTableHead}>
            <View style={styles.productTableRow}>
              <View style={styles.productTableTwoColumn}>
                <Text style={styles.text}>
                  {t('productName')}
                </Text>
              </View>
              <View style={styles.productTableColumn}>
                <Text style={styles.text}>
                  {t('price')}
                </Text>
              </View>
              <View style={styles.productTableColumn}>
                <Text style={styles.text}>
                  {t('quantity')}
                </Text>
              </View>
              <View style={styles.productTableColumn}>
                <Text style={styles.text}>
                  {t('total')}
                </Text>
              </View>
            </View>
          </View>


          <View>
            {order?.line_items?.map(item =>
              <View key={item.id} style={styles.productTableRow}>
                <View style={styles.productTableTwoColumn}>
                  <Text style={styles.text}>
                    {item.name}
                  </Text>
                </View>
                <View style={styles.productTableColumn}>
                  <Text style={styles.text}>
                    {formatPrice(item.price)} {order.currency}
                  </Text>
                </View>
                <View style={styles.productTableColumn}>
                  <Text style={styles.text}>
                    {item.quantity}
                  </Text>
                </View>
                <View style={styles.productTableColumn}>
                  <Text style={styles.text}>
                    {formatPrice(+item.total)} {order.currency}
                  </Text>
                </View>
              </View>,
            )}
          </View>
        </View>

        <View style={styles.island}>
          <Text style={styles.secondaryTitle}>
            {t('orderTotals')}
          </Text>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('subtotal')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {formatPrice(subtotal)} {order?.currency}
              </Text>
            </View>
          </View>

          {order?.coupon_lines?.map(line => {
            const name = `Kod rabatowy ${line.discount_type === 'percent' ? `-${line.nominal_amount}% ` : ''}`;
            return (
              <View key={name} style={styles.split}>
                <View style={styles.splitFirst}>
                  <Text style={styles.text}>
                    {name}
                  </Text>
                </View>
                <View style={styles.splitLast}>
                  <Text style={styles.text}>
                    {formatPrice(+line.discount)} {order?.currency}
                  </Text>
                </View>
              </View>
            );
          })}

          {order?.shipping_lines?.map(line => (
            <View key={line.id} style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>
                  {line.method_title}
                </Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {formatPrice(+line.total)} {order?.currency}
                </Text>
              </View>
            </View>
          ))}

          {order?.fee_lines?.map(line => (
            <View key={line.id} style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>
                  {line.name}
                </Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {formatPrice(+line.total)} {order?.currency}
                </Text>
              </View>
            </View>
          ))}

          {order?.tax_lines?.map(line => (
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
          ))}

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('paymentMethod')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.payment_method_title}
              </Text>
            </View>
          </View>


          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('total')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {formatPrice(+order?.total)} {order?.currency}
              </Text>
            </View>
          </View>

        </View>

        {/* Billings */}
        <View style={styles.island}>
          <Text style={styles.secondaryTitle}>
            {t('billing')}
          </Text>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('first_name')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.first_name || order?.billing?.last_name ? `${order?.billing.first_name} ${order?.billing.last_name}` : '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('company')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.company || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('address_1')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.address_1 || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('address_2')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.address_2 || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('city')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.city || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('postcode')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.postcode || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('country')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.country || '—'}
              </Text>
            </View>
          </View>

          {Boolean(order?.billing?.state) && (
            <View style={styles.split}>
              <View style={styles.splitFirst}>
                <Text style={styles.text}>
                  {t('state')}
                </Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {order?.billing?.state || '—'}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('email')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.email ?
                  <Link src={`mailto:${order?.billing.email}`}>{order?.billing.email}</Link> : '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('phone')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.billing?.phone ? <Link src={`tel:${order?.billing.phone}`}>{order?.billing.phone}</Link> : '—'}
              </Text>
            </View>
          </View>

        </View>

        {/* Shipping */}
        <View style={styles.island}>
          <Text style={styles.secondaryTitle}>
            {t('shipping')}
          </Text>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('first_name')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.shipping?.first_name || order?.shipping?.last_name ? `${order?.shipping.first_name} ${order?.shipping.last_name}` : '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('company')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.shipping?.company || "—"}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('address_1')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.shipping?.address_1 || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('address_2')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.shipping?.address_2 || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('city')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.shipping?.city || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('postcode')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.shipping?.postcode || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('country')}
              </Text>
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
                <Text style={styles.text}>
                  {t('state')}
                </Text>
              </View>
              <View style={styles.splitLast}>
                <Text style={styles.text}>
                  {order?.shipping?.state || '—'}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('email')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.shipping?.email ?
                  <Link src={`mailto:${order?.shipping.email}`}>{order?.shipping.email}</Link> : '—'}
              </Text>
            </View>
          </View>

          <View style={styles.split}>
            <View style={styles.splitFirst}>
              <Text style={styles.text}>
                {t('phone')}
              </Text>
            </View>
            <View style={styles.splitLast}>
              <Text style={styles.text}>
                {order?.shipping?.phone ?
                  <Link src={`tel:${order?.shipping.phone}`}>{order?.shipping.phone}</Link> : '—'}
              </Text>
            </View>
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default OrderPdf;