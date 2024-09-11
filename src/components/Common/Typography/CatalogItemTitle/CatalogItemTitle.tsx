import styled from "styled-components";

export const CatalogItemTitle = styled.span`
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
    }
`;