import styled from "styled-components";

export const ProductPrice = styled.p`
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        line-height: 24px;
    }
`;