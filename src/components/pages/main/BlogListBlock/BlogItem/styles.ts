import { Text } from "@/styles/components";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

export const BlogItemContainer = styled.div`
    grid-column: span 1;  
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    row-gap: 16px;
`;

export const StyledWrapperLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

export const ImageBlock = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1.88;
    border-radius: 20px;
    overflow: hidden;

    @media ${({ theme }) => theme.media.large} {
        aspect-ratio: 2.15;
        border-radius: 8px;
    }

    @media ${({ theme }) => theme.media.medium} {
        aspect-ratio: 1.88;
    }
`;

export const StyledImage = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    fill
    priority
`;

export const ContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    row-gap: 8px;
`;

export const BottomContentBlock = styled(ContentBlock)`
    flex-grow: 1;
`;

export const StyledDate = styled(Text)`
    color: ${({ theme }) => theme.colors.grey};
    text-transform: uppercase;

    @media ${({ theme }) => theme.media.large} {
        font: ${({ theme }) => theme.fonts.bodysmallReg};
    }

    @media ${({ theme }) => theme.media.medium} {
        font-size: 10px;
    }
`;

export const TextContent = styled(Text)`
    @media ${({ theme }) => theme.media.large} {
       font-size: 14px;
    }
`;

export const StyledLink = styled(Link)`
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    color: ${({ theme }) => theme.colors.black};
    transition: opacity 0.2s ease;

    @media ${({ theme }) => theme.media.large} {
       font-size: 12px;
    }

    &:hover {
        opacity: 0.7;
    }
`;
