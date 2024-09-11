import styled from "styled-components";

export const ProductImageWrapper = styled.div`
    position: relative;
    width: 80px;
    height: 80px;

    @media ${({ theme }) => theme.media.medium} {
        width: 100px;
        height: 100px;
    }

    @media ${({ theme }) => theme.media.large} {
        width: 205px;
        height: 205px;
    }
`