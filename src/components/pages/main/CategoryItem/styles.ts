import { CategoryItemContainerProps } from "@/types/pages/shop";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

export const CategoryItemContainer = styled.div<CategoryItemContainerProps>`
    position: relative;
    overflow: hidden;
    grid-column: ${({ double }) => double ? 'span 2' : 'span 1'};
    background-color: ${({ theme }) => theme.background.secondary};
    border-radius: 20px;    
    height: 392px;
    padding: 16px;
    z-index: 1;

    @media ${({ theme }) => theme.media.large} {
        height: 208px;
    }

    @media ${({ theme }) => theme.media.medium} {
        grid-column: span 4;
        height: 236px;
    }
`;

export const BackGroundImage = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;

    @media ${({ theme }) => theme.media.large} {
        row-gap: 8px;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
`;