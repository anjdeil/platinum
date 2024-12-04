import styled from "@emotion/styled";
import Link from "next/link";

export const BannerWrapper = styled(Link)`
    position: relative;
    width: 100%;
    aspect-ratio: 5.3;
    max-width: 1440px;
    margin: auto;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 16px;
    text-decoration: none;
    
    @media ${({ theme }) => theme.media.large} {
        width: auto;
        margin-inline: 32px;
    }

    @media ${({ theme }) => theme.media.medium} {
        max-width: 390px;
        margin: auto;
        aspect-ratio: 0.7;
        padding-top: 20px;
    }

    @media ${({ theme }) => theme.media.small} {
        margin-inline: 20px
    }

    & img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;

export const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    grid-column: 2 / span 4;
    justify-self: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    align-items: center;
    justify-content: center;

    @media ${({ theme }) => theme.media.large} {
        row-gap: 8px;
    }

    @media ${({ theme }) => theme.media.medium} {
        grid-column: 1 / -1;
        align-self: flex-start;
    }
`;

export const StyledText = styled.p`
    font: ${({ theme }) => theme.fonts.bodysmallReg};
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;
`;


export const StyledLink = styled(Link)`
    &::after {
        content: '';
        position: absolute;
        inset: 0;
    }
`;