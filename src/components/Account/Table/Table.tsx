import { useAppSelector } from "@/store";
import { AccountTitle, StyledButton } from "@/styles/components";
import { TableProps } from "@/types/layouts/Account";
import { useTheme } from "@emotion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { StyledActionsTd, StyledBody, StyledBodyTr, StyledDateTd, StyledDetailesTd, StyledDetailesTh, StyledHead, StyledNoAndDate, StyledOrderSpan, StyledOrderWrapper, StyledPdfButton, StyledSpan, StyledTable, StyledTd, StyledTh, StyledTotalSpan, StyledTr } from "./styles";
import Image from "next/image";
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderPdf from "@/pdf/OrderPdf";
import { useEffect, useState } from "react";

const Table: React.FC<TableProps> = ({ orderList, title, ...props }) => {
    const currency = useAppSelector((state) => state.currentCurrency);
    const theme = useTheme();
    const t = useTranslations("MyAccount");

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <>
            {title &&
                <AccountTitle
                    as={"h2"}
                    textAlign="center"
                    uppercase
                    marginBottom={24}
                    tabletMarginBottom={16}
                    mobMarginBottom={16}
                >
                    {title}
                </AccountTitle>
            }
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
                    {orderList.map(item => {
                        const dateCreated = item.date_created && new Date(item.date_created).toLocaleDateString("pl-PL", {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }).replace(/\./g, "-").replace(/\,/g, " ");

                        return (
                            <StyledBodyTr key={item.id}>
                                <StyledTd>
                                    <StyledNoAndDate>
                                        <StyledSpan>{item.id}</StyledSpan>
                                        <StyledSpan>{dateCreated}</StyledSpan>
                                    </StyledNoAndDate>
                                </StyledTd>
                                <StyledDetailesTd>
                                    <StyledTotalSpan>{t("shipping")}: {item.shipping_lines[0].method_title}</StyledTotalSpan>
                                    <StyledTotalSpan>{t("payment")}: {item.payment_method_title}</StyledTotalSpan>
                                    <StyledTotalSpan>{item.total} {currency.symbol}</StyledTotalSpan>
                                </StyledDetailesTd>
                                <StyledDateTd>
                                    {dateCreated}
                                </StyledDateTd>
                                <StyledTd>
                                    <StyledOrderWrapper>
                                        <StyledOrderSpan>{t("status")}</StyledOrderSpan>
                                        <StyledOrderSpan>{t(item.status)}</StyledOrderSpan>
                                    </StyledOrderWrapper>
                                </StyledTd>
                                <StyledActionsTd>
                                    <Link href={`/my-account/orders/${item.id}`}>
                                        <StyledButton color={theme.colors.white} backgroundColor={theme.colors.primary}>{t("seeMore")}</StyledButton>
                                    </Link>
                                    <PDFDownloadLink document={<OrderPdf order={item} />} fileName={`order-${item.id}.pdf`}>
                                        <StyledPdfButton aria-label={t("downloadPdf")} >
                                            <Image width={28} height={28} src={`/assets/icons/pdf-icon.svg`} alt="pdf" />
                                        </StyledPdfButton>
                                    </PDFDownloadLink>
                                </StyledActionsTd>
                            </StyledBodyTr>
                        )
                    })}
                </StyledBody>
            </StyledTable>
        </>
    )
}

export default Table;