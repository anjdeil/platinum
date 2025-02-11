import { Text } from '@/styles/components';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

export const BlogItemContainer = styled.div`
  position: relative;
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  row-gap: 16px;
`;

export const StyledWrapperLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
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
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.8);
  }
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
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

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

export const CategoriesTagWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  row-gap: 16px;

  @media ${({ theme }) => theme.media.large} {
    top: 8px;
    left: 8px;
  }
`;

export const StyledTag = styled.div`
  padding: 10px 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.lightBorder};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;

  @media ${({ theme }) => theme.media.large} {
    font-size: 10px;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 4px;
  }
`;
