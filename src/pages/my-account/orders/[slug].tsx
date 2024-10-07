import AccountLayout from "@/components/Account/AccountLayout";
import BillingShippingAddress from "@/components/Account/BillingShippingAddress/BillingShippingAddress";
import OrderInfo from "@/components/Account/OrderInfo/OrderInfo";
import OrderProductList from "@/components/Account/OrderProductList/OrderProductList";
import { StyledOrderButton } from "@/components/Account/OrderTable/styles";
import OrderTotals from "@/components/Account/OrderTotals/OrderTotals";
import Notification from "@/components/Layouts/Notification/Notification";
import OrderPdf from "@/pdf/OrderPdf";
import wooCommerceRestApi from "@/services/wooCommerceRestApi";
import { AccountInfoWrapper } from "@/styles/components";
import { OrderType } from "@/types/services/woocommerce/OrderType";
import areBillingAndShippingEqual from "@/utils/areBillingAndShippingEqual";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
    
    const date = new Date(order.date_created);

    const formattedDate = date.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\./g, '-');

    const billingAndShippingEqual = areBillingAndShippingEqual(order.billing, order.shipping);

    return (
        <AccountLayout title={`${t('order')} #${order.id}`}>
            <Notification>
                {`${t("notification", { orderId: order.id, date: formattedDate })} ${t(order.status)}.`}
                <PDFDownloadLink document={<OrderPdf order={order} />} fileName={`order-${order.id}.pdf`}>
                    <StyledOrderButton aria-label={t("downloadPdf")} >
                        <Image width={28} height={28} src={`/assets/icons/pdf-icon.svg`} alt="pdf" />
                    </StyledOrderButton>
                </PDFDownloadLink>
            </Notification>
            <AccountInfoWrapper>
                <OrderProductList lineItems={order.line_items} currency={order.currency_symbol} />
                <OrderInfo title="summaryOrder">
                    <OrderTotals order={order} />                    
                </OrderInfo>
                <OrderInfo title="customerData">
                    <BillingShippingAddress address={order.billing} />
                </OrderInfo>
                {!billingAndShippingEqual && (
                    <OrderInfo title="shippingAddress">
                        <BillingShippingAddress address={order.shipping} />
                    </OrderInfo>
                )}
            </AccountInfoWrapper>
        </AccountLayout>
    )
}

export default Order;