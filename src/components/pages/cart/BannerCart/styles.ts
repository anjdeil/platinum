import styled from "@emotion/styled";

export const BannerContainer = styled.div`
    box-sizing: border-box;
    min-height: 272px;    
    overflow: hidden;
    background: ${({ theme }) => theme.background.banner};

    @media ${({ theme }) => theme.media.large} {
        width: auto;
        min-height: 140px;
        margin-inline: 32px;
        aspect-ratio: 5;
    }

    @media ${({ theme }) => theme.media.medium} {
        max-width: 390px;
        margin-inline: auto;
        aspect-ratio: 0.7;
    }

    @media ${({ theme }) => theme.media.small} {
        margin-inline: 20px;
    }
`;

export const BannerWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1280px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 16px;
    
    @media ${({ theme }) => theme.media.medium} {
        padding-top: 20px;
    }

    &::before {
        content: '';
        position: absolute;
        width: 20%;
        aspect-ratio: 2;
        top: 4%;
        right: 2%;
        background-image: url('/images/cloud.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        z-index: 1;

        @media ${({ theme }) => theme.media.medium} {
            width: 47%;
            top: 34%;
        }
    } 

    &::after {
        content: '';
        position: absolute;
        width: 35%;
        aspect-ratio: 2;
        top: 44%;
        left: 33%;
        background-image: url('/images/cloud.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        z-index: 1;

        @media ${({ theme }) => theme.media.medium} {
            width: 77%;
            top: 82%;
            left: -40%;
        }
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
    }
`;

export const StyledText = styled.p`
    font: ${({ theme }) => theme.fonts.bodysmallReg};
    text-transform: uppercase;
`;

export const ImageWrapper = styled.div`
    grid-column: 8 / span 4;
    margin-bottom: -44px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${({ theme }) => theme.media.medium} {
        grid-column: 1 / -1;
        margin-bottom: 0;
    }

    & img {
        @media ${({ theme }) => theme.media.large} {
            width: 70%;
            height: auto;
        }

        @media ${({ theme }) => theme.media.medium} {
            width: 100%;
        }
    }
`;