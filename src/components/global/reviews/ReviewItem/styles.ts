import { Text } from "@/styles/components";
import styled from "@emotion/styled";
import { Collapse } from "@mui/material";

export const ReviewContainer = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: flex-start;
    row-gap: 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.background.secondary};

    &:hover > span {
        -webkit-line-clamp: unset;
        overflow: visible;
    }

    @media ${({ theme }) => theme.media.large} {
        row-gap: 8px;
    }
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
`;

export const ImageWrapper = styled.div`
    width: 64px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    display: flex;

    & img {
        width: 100%;
        height: 100%;
    }

    @media ${({ theme }) => theme.media.large} {
       width: 34px;
    }
`;

export const ReviewName = styled(Text)`
    @media ${({ theme }) => theme.media.large} {
       font-size: 14px;
    }
`;

export const ReviewText = styled(Collapse)`
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};

    @media ${({ theme }) => theme.media.large} {
       font-size: 14px;
    }
`;

export const MoreButton = styled.button`
    border: none;
    background-color: transparent;
    align-self: flex-end;
    cursor: pointer;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.7;
    }

    @media ${({ theme }) => theme.media.large} {
       font-size: 14px;
    }
`;


