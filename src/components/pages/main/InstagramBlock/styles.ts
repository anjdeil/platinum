import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import Link from 'next/link';

export const InstagramBlockContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  gap: 16px;
  margin-top: 24px;

  @media ${({ theme }) => theme.media.preSmall} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, minmax(0, 1fr));
    grid-auto-flow: dense;
    direction: rtl;
  }
`;

export const InstagramAccountWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;

export const IconWrapper = styled.div`
  width: 102px;
  height: 102px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  margin-bottom: 24px;

  @media ${({ theme }) => theme.media.medium} {
    width: 80px;
    height: 80px;
  }
`;
export const InstagramPhotoWrapper = styled(Link)`
  display: inline-block;
  max-width: 308px;
  max-height: 306px;
  width: 100%;
  height: auto;
  aspect-ratio: 308 / 306;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;
export const InstagramPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledSkeletonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;

  @media ${({ theme }) => theme.media.preSmall} {
    flex-wrap: wrap;
  }
`;

export const StyledSkeleton = styled(Skeleton)`
  width: 24%;
  height: auto;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.background.secondary};

  @media ${({ theme }) => theme.media.preSmall} {
    width: 46%;
  }
`;