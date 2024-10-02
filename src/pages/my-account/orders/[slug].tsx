import AccountLayout from "@/components/Account/AccountLayout";
import AccountOrderProductList from "@/components/Account/AccountOrderProductList/AccountOrderProductList";
import AccountOrderTable from "@/components/Account/AccountOrderTable/AccountOrderTable";
import Notification from "@/components/Layouts/Notification/Notification";
import wooCommerceRestApi from "@/services/wooCommerceRestApi";
import { AccountInfoWrapper, InfoLine } from "@/styles/components";
import { OrderType } from "@/types/services/woocommerce/OrderType";
import areBillingAndShippingEqual from "@/utils/areBillingAndShippingEqual";
import getSubtotalByLineItems from "@/utils/getSubtotalByLineItems";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { slug } = context.query;

    try {
        const orderResponse = await wooCommerceRestApi.get(`orders/${slug}`);

        return {
            props: {
                order: orderResponse.data
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

interface OrderPropsType {
    order: OrderType
}

const Order: FC<OrderPropsType> = ({ order }) => {
    const t = useTranslations("MyAccount");
    
    console.log(order);

    const date = new Date(order.date_created);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const billingAndShippingEqual = areBillingAndShippingEqual(order.billing, order.shipping);

    const subtotal = order?.line_items ? getSubtotalByLineItems(order.line_items) : 0;

    return (
        <AccountLayout title={`${t('order')} #${order.id}`}>
            <Notification>
                {`${t("notification", { orderId: order.id, date: formattedDate })} ${t(order.status)}`}
            </Notification>
            <AccountInfoWrapper>
                <AccountOrderProductList lineItems={order.line_items} />
                <AccountOrderTable title="summaryOrder">
                    <InfoLine textAllign="right">
                        <span>{t("products")}</span>
                        <span>{`${subtotal} ${order.currency_symbol}`}</span>
                    </InfoLine>
                    <InfoLine textAllign="right">
                        <span>{t("delivery")}</span>
                        <span>{`${Math.round(+order.shipping_total)} ${order.currency_symbol}`}</span>
                    </InfoLine>
                    <InfoLine
                        textAllign="right"
                        fontSize="24px"
                        lineHeight="32px"
                        tabletFontSize="16px"
                        tabletLineHeight="24px"
                        fontWeight={500}
                    >
                        <span>{t("totalToPay")}</span>
                        <span>{`${Math.round(+order.total)} ${order.currency_symbol}`}</span>
                    </InfoLine>
                </AccountOrderTable>
                <AccountOrderTable title="customerData">
                    {Object.entries(order.billing).map(([key, value]) => (
                        <>
                            {value !== '' && (
                                <InfoLine key={key}>
                                    <span>{t(key)}</span>
                                    <span>{value}</span>
                                </InfoLine>
                            )}
                        </>
                   ))}
                </AccountOrderTable>
                {!billingAndShippingEqual && (
                    <AccountOrderTable title="shippingAddress">
                        {Object.entries(order.shipping).map(([key, value]) => (
                            <>
                                {value !== '' && (
                                    <InfoLine key={key}>
                                        <span>{t(key)}</span>
                                        <span>{value}</span>
                                    </InfoLine>
                                )}
                            </>
                    ))}
                    </AccountOrderTable>
                )}
            </AccountInfoWrapper>
        </AccountLayout>
    )
}

export default Order;