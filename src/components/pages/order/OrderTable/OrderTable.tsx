import OrderPdf from "@/pdf/OrderPdf";
import { AccountTitle, StyledButton } from "@/styles/components";
import { TableProps } from "@/types/pages/account";
import { useTheme } from "@emotion/react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SkeletonOrderTable } from "./SkeletonOrderTable";
import { StyledActionsTd, StyledBody, StyledBodyTr, StyledDateTd, StyledDetailesTd, StyledDetailesTh, StyledHead, StyledLinkDesktopButton, StyledLinkMobileButton, StyledNoAndDate, StyledOrderButton, StyledOrderSpan, StyledOrderWrapper, StyledSpan, StyledTable, StyledTd, StyledTh, StyledTotalSpan, StyledTr } from "./styles";

const OrderTable: React.FC<TableProps> = ({ orderList, title }) => {
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
                            <StyledTh>№</StyledTh>
                            <StyledDetailesTh>{t("deliveryPaymentTotal")}</StyledDetailesTh>
                            <StyledTh>{t("date")}</StyledTh>
                            <StyledTh>{t("status")}</StyledTh>
                            <StyledTh>{t("action")}</StyledTh>
                        </StyledTr>
                </StyledHead>
                {orderList ? (
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
                                            <StyledSpan>#{item.id}</StyledSpan>
                                            <StyledSpan>{dateCreated}</StyledSpan>
                                        </StyledNoAndDate>
                                    </StyledTd>
                                    <StyledDetailesTd>
                                        <StyledTotalSpan>{t("shipping")}: {item.shipping_lines[0].method_title}</StyledTotalSpan>
                                        <StyledTotalSpan>{t("payment")}: {item.payment_method_title}</StyledTotalSpan>
                                        <StyledTotalSpan>{item.total} {item.currency_symbol}</StyledTotalSpan>
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
                                        <StyledLinkMobileButton href={`/my-account/orders/${item.id}`}>
                                            <StyledButton color={theme.colors.white} backgroundColor={theme.colors.primary}>{t("seeMore")}</StyledButton>
                                        </StyledLinkMobileButton>
                                        <StyledLinkDesktopButton href={`/my-account/orders/${item.id}`}>
                                            <StyledOrderButton aria-label={t("seeMore")} >
                                                <Image width={28} height={28} src={`/assets/icons/view-icon.svg`} alt="view" />
                                            </StyledOrderButton>
                                        </StyledLinkDesktopButton>
                                        <PDFDownloadLink document={<OrderPdf order={item} />} fileName={`order-${item.id}.pdf`}>
                                            <StyledOrderButton aria-label={t("downloadPdf")} >
                                                <Image width={28} height={28} src={`/assets/icons/pdf-icon.svg`} alt="pdf" />
                                            </StyledOrderButton>
                                        </PDFDownloadLink>
                                    </StyledActionsTd>
                                </StyledBodyTr>
                            )
                        })}
                    </StyledBody>
                ) : (
                    <SkeletonOrderTable />
                )}
            </StyledTable>            
        </>
    )
}

export default OrderTable;