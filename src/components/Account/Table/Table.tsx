import { useAppSelector } from "@/store";
import { AccountTitle, StyledButton } from "@/styles/components";
import { TableProps } from "@/types/layouts/Account";
import { useTheme } from "@emotion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { StyledBody, StyledBodyTr, StyledDateTd, StyledDetailesTd, StyledDetailesTh, StyledHead, StyledNoAndDate, StyledOrderSpan, StyledOrderWrapper, StyledSpan, StyledTable, StyledTd, StyledTh, StyledTotalSpan, StyledTr } from "./styles";

const Table: React.FC<TableProps> = ({orderList, title}) =>
{
    const currency = useAppSelector((state) => state.currentCurrency);
    const theme = useTheme();
    const t = useTranslations("MyAccount");
    return (
        <>
            <AccountTitle
                as={"h2"}
                textAlign="center"
                uppercase
                marginBottom={24}
                tabletMarginBottom={16}
                mobMarginBottom={16}
            >{t(title)}</AccountTitle>
            <StyledTable>
                <StyledHead>
                    <StyledTr>
                        <StyledTh>{t("number")}</StyledTh>
                        <StyledDetailesTh>{t("deliveryPaymentTotal")}</StyledDetailesTh>
                        <StyledTh>{t("date")}</StyledTh>
                        <StyledTh>{t("status")}</StyledTh>
                        <StyledTh>{t("value")}</StyledTh>
                    </StyledTr>
                </StyledHead>
                <StyledBody>
                    {orderList.map(item => (
                        <StyledBodyTr key={item.id}>
                            <StyledTd>
                                <StyledNoAndDate>
                                    <StyledSpan>{item.id}</StyledSpan> 
                                    <StyledSpan>{item.date_created}</StyledSpan>
                                </StyledNoAndDate>
                            </StyledTd>
                            <StyledDetailesTd>
                                <StyledTotalSpan>{t("shipping")}: {item.shipping_lines[0].method_title}</StyledTotalSpan>
                                <StyledTotalSpan>{t("payment")}: {item.payment_method_title}</StyledTotalSpan>
                                <StyledTotalSpan>{item.total} {currency.symbol}</StyledTotalSpan>
                            </StyledDetailesTd>
                            <StyledDateTd>
                                {item.date_created}
                            </StyledDateTd>
                            <StyledTd>
                                <StyledOrderWrapper>
                                    <StyledOrderSpan>{t("status")}</StyledOrderSpan> 
                                    <StyledOrderSpan>{t(item.status)}</StyledOrderSpan>
                                </StyledOrderWrapper>
                            </StyledTd>
                            <StyledTd>
                                <Link href={`/my-account/orders/${item.id}`}>
                                    <StyledButton color={theme.colors.white} backgroundColor={theme.colors.primary}>{t("seeMore")}</StyledButton>
                                </Link>
                            </StyledTd>
                        </StyledBodyTr>
                    ))}
                </StyledBody>
            </StyledTable>
        </>
    )
}

export default Table;