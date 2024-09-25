import { StyledButton } from "@/styles/components";
import { useTheme } from "@emotion/react";
import { useTranslations } from "next-intl";
import { StyledBody, StyledBodyTr, StyledDateTd, StyledHead, StyledNoAndDate, StyledOrderSpan, StyledOrderWrapper, StyledSpan, StyledTable, StyledTd, StyledTh, StyledTotalSpan, StyledTr } from "./styles";

const Table = () =>
{
    const orderList = [
        {
            id: "#273249",
            details: "Shipping: GLS Courier to Portugal Payment: Bank transfer 81,11 EUR",
            date: "05-08-2024 21:23:42",
            status: "Order adopted"
        },
        {
            id: "#273249",
            details: "Shipping: GLS Courier to Portugal Payment: Bank transfer 81,11 EUR",
            date: "05-08-2024 21:23:42",
            status: "Order adopted"
        },
        {
            id: "#273249",
            details: "Shipping: GLS Courier to Portugal Payment: Bank transfer 81,11 EUR",
            date: "05-08-2024 21:23:42",
            status: "Order adopted"
        },
    ]

    const theme = useTheme();
    const t = useTranslations("MyAccount");
    return (
        <StyledTable>
            <StyledHead>
                <StyledTr>
                    <StyledTh>NO.</StyledTh>
                    <StyledTh>{t("deliveryPaymentTotal")}</StyledTh>
                    <StyledTh>{t("date")}</StyledTh>
                    <StyledTh>{t("status")}</StyledTh>
                    <StyledTh>{t("value")}</StyledTh>
                </StyledTr>
            </StyledHead>
            <StyledBody>
                {orderList.map(item => (
                    <StyledBodyTr>
                        <StyledTd>
                            <StyledNoAndDate>
                                <StyledSpan>{item.id}</StyledSpan> 
                                <StyledSpan>{item.date}</StyledSpan>
                            </StyledNoAndDate>
                        </StyledTd>
                        <StyledTd>
                            <StyledTotalSpan>{item.details}</StyledTotalSpan>
                        </StyledTd>
                        <StyledDateTd>
                            {item.date}
                        </StyledDateTd>
                        <StyledTd>
                            <StyledOrderWrapper>
                                <StyledSpan>{t("status")}</StyledSpan> 
                                <StyledOrderSpan>{item.status}</StyledOrderSpan>
                            </StyledOrderWrapper>
                        </StyledTd>
                        <StyledTd>
                            <StyledButton color={theme.colors.white} backgroundColor={theme.colors.primary}>{t("seeMore")}</StyledButton>
                        </StyledTd>
                    </StyledBodyTr>
                ))}
            </StyledBody>
        </StyledTable>
    )
}

export default Table;