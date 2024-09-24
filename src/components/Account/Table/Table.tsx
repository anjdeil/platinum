import { StyledButton } from "@/styles/components";
import { useTheme } from "@emotion/react";
import { StyledBody, StyledBodyTr, StyledDateTd, StyledHead, StyledNoAndDate, StyledOrderSpan, StyledOrderWrapper, StyledSpan, StyledTable, StyledTd, StyledTh, StyledTotalSpan, StyledTr } from "./styles";

const Table = () =>
{
    const theme = useTheme();
    return (
        <StyledTable>
            <StyledHead>
                <StyledTr>
                    <StyledTh>NO.</StyledTh>
                    <StyledTh>DELIVERY / PAYMENT / TOTAL</StyledTh>
                    <StyledTh>DATE</StyledTh>
                    <StyledTh>STATUS</StyledTh>
                    <StyledTh>Value</StyledTh>
                </StyledTr>
            </StyledHead>
            <StyledBody>
                <StyledBodyTr>
                    <StyledTd>
                        <StyledNoAndDate>
                           <StyledSpan>#273249</StyledSpan> 
                           <StyledSpan>05-08-2024 21:23:42</StyledSpan>
                        </StyledNoAndDate>
                    </StyledTd>
                    <StyledTd>
                        <StyledTotalSpan>Shipping: GLS Courier to Portugal Payment: Bank transfer 81,11 EUR</StyledTotalSpan>
                    </StyledTd>
                    <StyledDateTd>
                        05-08-2024 21:23:42
                    </StyledDateTd>
                    <StyledTd>
                        <StyledOrderWrapper>
                            <StyledSpan>STATUS</StyledSpan> 
                            <StyledOrderSpan>Order adopted</StyledOrderSpan>
                        </StyledOrderWrapper>
                    </StyledTd>
                    <StyledTd>
                    <StyledButton color={theme.colors.white} backgroundColor={theme.colors.primary}>See more</StyledButton>
                    </StyledTd>
                </StyledBodyTr>
                <StyledBodyTr>
                    <StyledTd>
                        <StyledNoAndDate>
                           <StyledSpan>#273249</StyledSpan> 
                           <StyledSpan>05-08-2024 21:23:42</StyledSpan>
                        </StyledNoAndDate>
                    </StyledTd>
                    <StyledTd>
                        <StyledTotalSpan>Shipping: GLS Courier to Portugal Payment: Bank transfer 81,11 EUR</StyledTotalSpan>
                    </StyledTd>
                    <StyledDateTd>
                        05-08-2024 21:23:42
                    </StyledDateTd>
                    <StyledTd>
                        <StyledOrderWrapper>
                            <StyledSpan>STATUS</StyledSpan> 
                            <StyledOrderSpan>Order adopted</StyledOrderSpan>
                        </StyledOrderWrapper>
                    </StyledTd>
                    <StyledTd>
                    <StyledButton color={theme.colors.white} backgroundColor={theme.colors.primary}>See more</StyledButton>
                    </StyledTd>
                </StyledBodyTr>
                <StyledBodyTr>
                    <StyledTd>
                        <StyledNoAndDate>
                           <StyledSpan>#273249</StyledSpan> 
                           <StyledSpan>05-08-2024 21:23:42</StyledSpan>
                        </StyledNoAndDate>
                    </StyledTd>
                    <StyledTd>
                        <StyledTotalSpan>Shipping: GLS Courier to Portugal Payment: Bank transfer 81,11 EUR</StyledTotalSpan>
                    </StyledTd>
                    <StyledDateTd>
                        05-08-2024 21:23:42
                    </StyledDateTd>
                    <StyledTd>
                        <StyledOrderWrapper>
                            <StyledSpan>STATUS</StyledSpan> 
                            <StyledOrderSpan>Order adopted</StyledOrderSpan>
                        </StyledOrderWrapper>
                    </StyledTd>
                    <StyledTd>
                    <StyledButton color={theme.colors.white} backgroundColor={theme.colors.primary}>See more</StyledButton>
                    </StyledTd>
                </StyledBodyTr>
            </StyledBody>
        </StyledTable>
    )
}

export default Table;