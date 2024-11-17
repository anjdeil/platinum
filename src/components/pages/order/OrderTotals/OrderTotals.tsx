import { useTranslations } from "next-intl";
import { FC } from "react";
import OrderTotalsRowsSkeleton from "./OrderTotalsRowsSkeleton";
import { Label, LabelCode, LastRow, Row, TotalsTable, Value } from "./styles";
import getSubtotalByLineItems from "@/utils/getSubtotalByLineItems";
import { OrderType } from "@/types/services/wooCustomApi/shop";

interface OrderTotalsPropsType
{
    order: OrderType | undefined | null;
    isLoading?: boolean;
}

const OrderTotals: FC<OrderTotalsPropsType> = ({ order, isLoading = false }) =>
{
    const subtotal = order?.line_items ? getSubtotalByLineItems(order.line_items) : 0;
    const t = useTranslations("MyAccount");

    return (
        <TotalsTable>
            {isLoading ? (
                <OrderTotalsRowsSkeleton />
            ) : (
                <>
                    <Row>
                        <Label>{t("amount")}</Label>
                        <Value>{`${subtotal} ${order?.currency_symbol}`}</Value>
                    </Row>
                    {order?.shipping_lines?.map(line => (
                        <Row key={line.id}>
                            <Label>{line.method_title}</Label>
                            <Value>{`${line.total} ${order?.currency_symbol}`}</Value>
                        </Row>
                    ))}
                    {order?.coupon_lines?.map(line =>
                    {
                        const name = `${t("discountCode")} ${line.discount_type === "percent" ? `-${line.nominal_amount}% ` : ""}`;
                        return (
                            <Row key={line.id}>
                                <Label>
                                    {name} <br />
                                    <LabelCode>{line.code}</LabelCode>
                                </Label>
                                <Value>- {`${line.discount} ${order?.currency_symbol}`}</Value>
                            </Row>
                        );
                    })}
                    {order?.fee_lines?.map(line => (
                        <Row key={line.id}>
                            <Label>{line.name}</Label>
                            <Value>{`${line.total} ${order?.currency_symbol}`}</Value>
                        </Row>
                    ))}
                    {order?.tax_lines?.map(line => (
                        <Row key={line.id}>
                            <Label>
                                {line.label} ({line.rate_percent}%)
                            </Label>
                            <Value>{`${line.tax_total} ${order?.currency_symbol}`}</Value>
                        </Row>
                    ))}
                    <Row>
                        <Label>{t("paymentMethod")}</Label>
                        <Value>{order?.payment_method_title || "—"}</Value>
                    </Row>
                    <LastRow>
                        <Label>{t("totalToPay")}</Label>
                        <Value>{`${order?.total || "—"} ${order?.currency_symbol}`}</Value>
                    </LastRow>
                </>
            )}
        </TotalsTable>
    );
};

export default OrderTotals;
