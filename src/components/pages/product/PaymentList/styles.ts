import styled from "@emotion/styled";

export const PaymentListContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 22px 24px;
    background-color: ${({ theme }) => theme.background.secondary};

    @media ${({ theme }) => theme.media.large} {
        padding-block: 12px;
    }

    @media ${({ theme }) => theme.media.medium} {
        width: unset;        
        border-radius: 0;
        margin-inline: -20px;
    }

    & .swiper-wrapper,
    & .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .swiper-slide {
        height: 24px;

        @media ${({ theme }) => theme.media.large} {
            height: 16px;
        }

        & img,
        & svg {
            flex-shrink: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
`;
