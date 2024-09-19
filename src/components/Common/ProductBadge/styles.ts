import { BadgeStyledProps } from "@/types/Layouts/ProductBadge";
import styled from "@emotion/styled";


const getBackgroundColor = (type: "new" | "best" | "hot") => {
    switch (type) {
        case "new":
            return (props: any) => props.theme.colors.new;
        case "best":
            return (props: any) => props.theme.colors.best;
        case "hot":
            return (props: any) => props.theme.colors.hot;
        default:
            return (props: any) => props.theme.colors.black;
    }
};

export const BadgeStyled = styled.span<BadgeStyledProps>`
    box-sizing: border-box;
    min-width: ${({ minWidth = '39px' }) => minWidth};
    text-align: center;
    padding: 4px;
    border-radius: ${({ borderRadius = '8px' }) => borderRadius};
    font-size: 10px;
    line-height: 16px;
    font-weight: 400;
    text-transform: uppercase;
    background-color: ${({ type }) => getBackgroundColor(type)};
    color: #fff;

    @media ${({ theme }) => theme.media.medium} {
        font-size: 14px;
        text-transform: unset;
    }

    @media ${({ theme }) => theme.media.large} {
        min-width: 45px;
        padding: 4px 6.5px;
        border-radius: 10px;
        font-size: 12px;
        text-transform: uppercase;
    }
`;