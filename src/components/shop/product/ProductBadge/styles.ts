import { BadgeStyledProps, ProductBadgeProps } from "@/types/components/shop";
import styled from "@emotion/styled";

const getBackgroundColor = (type: ProductBadgeProps['type']) => {
    switch (type) {
        case "new":
            return (props: any) => props.theme.colors.new;
        case "best":
            return (props: any) => props.theme.colors.best;
        case "hot":
            return (props: any) => props.theme.colors.hot;
        case "sale":
            return (props: any) => props.theme.colors.sale;
        default:
            return (props: any) => props.theme.colors.best;
    }
};

export const BadgeStyled = styled.span<BadgeStyledProps>`
    box-sizing: border-box;
    min-width: 45px;
    padding: 4px 6.5px;
    text-align: center;
    border-radius: 10px;
    font: ${({ theme }) => theme.fonts.bodysmallReg};
    text-transform: uppercase;
    background-color: ${({ type }) => getBackgroundColor(type)};
    color: #fff;

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
        text-transform: unset;
    }

    @media ${({ theme }) => theme.media.medium} {
        min-width: ${({ minWidth = '39px' }) => minWidth};
        padding: 4px;
        border-radius: ${({ borderRadius = '8px' }) => borderRadius};
        font-size: 10px;
        text-transform: uppercase;
    }
`;