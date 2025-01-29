import { OrderType } from '@/types/services';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: "70px 50px"
    },
    text: {
        fontSize: 12
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 15
    },
    notification: {
        marginBottom: 15
    },
    productTableHead: {
        opacity: .5
    },
    productTableRow: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 6
    },
    productTableTwoColumn: {
        width: "40%",
    },
    productTableColumn: {
        width: "20%",
        textalign: "right"
    },
    productImage: {
        width: 50,
        height: 50,
        objectFit: "contain",
        objectPosition: "center"
    },
    productTable: {
        marginBottom: 15
    },
    island: {
        marginBottom: 15
    },
    secondaryTitle: {
        fontSize: 16,
        marginBottom: 10
    },
    split: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 6
    },
    splitFirst: {
        width: "50%",
        opacity: .5
    },
    splitLast: {
        width: "50%",
        textalign: "right"
    }
});


const OrderPdf = ({ order }: { order: OrderType }) => {

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
                    <Text style={styles.title}>{`Order #${order?.id}`}</Text>
                </View>

                <View style={styles.notification}>
                    <Text style={styles.text}>
                        Your order was successfully placed on {formattedDate}. It is currently {order?.status}.
                    </Text>
                </View>

                <View style={styles.productTable}>
                    <View style={styles.productTableHead}>
                        <View style={styles.productTableRow}>
                            <View style={styles.productTableTwoColumn}>
                                <Text style={styles.text}>
                                    Product name
                                </Text>
                            </View>
                            <View style={styles.productTableColumn}>
                                <Text style={styles.text}>
                                    Price
                                </Text>
                            </View>
                            <View style={styles.productTableColumn}>
                                <Text style={styles.text}>
                                    Quantity
                                </Text>
                            </View>
                            <View style={styles.productTableColumn}>
                                <Text style={styles.text}>
                                    Total
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
                                        {item.price} {order.currency}
                                    </Text>
                                </View>
                                <View style={styles.productTableColumn}>
                                    <Text style={styles.text}>
                                        {item.quantity}
                                    </Text>
                                </View>
                                <View style={styles.productTableColumn}>
                                    <Text style={styles.text}>
                                        {item.total} {order.currency}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.island}>
                    <Text style={styles.secondaryTitle}>
                        Order totals
                    </Text>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Subtotal
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {subtotal} {order?.currency}
                            </Text>
                        </View>
                    </View>

                    {order?.coupon_lines?.map(line => {
                        const name = `Kod rabatowy ${line.discount_type === 'percent' ? `-${line.nominal_amount}% ` : ""}`;
                        return (
                            <View key={name} style={styles.split}>
                                <View style={styles.splitFirst}>
                                    <Text style={styles.text}>
                                        {name}
                                    </Text>
                                </View>
                                <View style={styles.splitLast}>
                                    <Text style={styles.text}>
                                        {line.discount} {order?.currency}
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
                                    {line.total} {order?.currency}
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
                                    {line.total} {order?.currency}
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
                                    {line.tax_total} {order?.currency}
                                </Text>
                            </View>
                        </View>
                    ))}

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Payment method
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
                                Total
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.total} {order?.currency}
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Billings */}
                <View style={styles.island}>
                    <Text style={styles.secondaryTitle}>
                        Billing details
                    </Text>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                First name and last name
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.billing?.first_name || order?.billing?.last_name ? `${order?.billing.first_name} ${order?.billing.last_name}` : "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Company name
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {/*{order?.billing?.company || "—"}*/}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Address line 1
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.billing?.address_1 || "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Address line 2
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.billing?.address_2 || "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                City
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.billing?.city || "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Postcode
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.billing?.postcode || "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Country
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.billing?.country || "—"}
                            </Text>
                        </View>
                    </View>

                    {Boolean(order?.billing?.state) && (
                        <View style={styles.split}>
                            <View style={styles.splitFirst}>
                                <Text style={styles.text}>
                                    State
                                </Text>
                            </View>
                            <View style={styles.splitLast}>
                                <Text style={styles.text}>
                                    {order?.billing?.state || "—"}
                                </Text>
                            </View>
                        </View>
                    )}

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                E-mail
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.billing?.email ? <Link src={`mailto:${order?.billing.email}`}>{order?.billing.email}</Link> : "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Phone
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.billing?.phone ? <Link src={`tel:${order?.billing.phone}`}>{order?.billing.phone}</Link> : "—"}
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Shipping */}
                <View style={styles.island}>
                    <Text style={styles.secondaryTitle}>
                        Shipping details
                    </Text>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                First name and last name
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.shipping?.first_name || order?.shipping?.last_name ? `${order?.shipping.first_name} ${order?.shipping.last_name}` : "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Company name
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {/*{order?.shipping?.company || "—"}*/}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Address line 1
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.shipping?.address_1 || "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Address line 2
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.shipping?.address_2 || "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                City
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.shipping?.city || "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Postcode
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.shipping?.postcode || "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Country
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.shipping?.country || "—"}
                            </Text>
                        </View>
                    </View>

                    {Boolean(order?.shipping?.state) && (
                        <View style={styles.split}>
                            <View style={styles.splitFirst}>
                                <Text style={styles.text}>
                                    State
                                </Text>
                            </View>
                            <View style={styles.splitLast}>
                                <Text style={styles.text}>
                                    {order?.shipping?.state || "—"}
                                </Text>
                            </View>
                        </View>
                    )}

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                E-mail
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.shipping?.email ? <Link src={`mailto:${order?.shipping.email}`}>{order?.shipping.email}</Link> : "—"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.split}>
                        <View style={styles.splitFirst}>
                            <Text style={styles.text}>
                                Phone
                            </Text>
                        </View>
                        <View style={styles.splitLast}>
                            <Text style={styles.text}>
                                {order?.shipping?.phone ? <Link src={`tel:${order?.shipping.phone}`}>{order?.shipping.phone}</Link> : "—"}
                            </Text>
                        </View>
                    </View>

                </View>
            </Page>
        </Document>
    );
}

export default OrderPdf;