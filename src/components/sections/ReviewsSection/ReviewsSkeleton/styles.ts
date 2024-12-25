import styled from '@emotion/styled';
import 'swiper/css';

export const SkeletonContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  row-gap: 24px;
  margin-top: 24px;

  @media ${({ theme }) => theme.media.large} {
    height: 180px;
    row-gap: 8px;
  }
`;
export const ReviewContainer = styled.div`
  width: 32%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 16px;
  gap: 16px;

  @media (max-width: 768px) {
    width: 48.5%;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

export const ReviewerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

export const SkeletonAvatar = styled.div`
  width: 20%;

  @media ${({ theme }) => theme.media.large} {
    width: 15%;
  }
`;

export const Circle = styled.div`
  width: 64px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ theme }) => theme.background.skeleton};
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  @media ${({ theme }) => theme.media.large} {
    width: 34px;
  }
`;

export const SkeletonName = styled.p`
  width: 60%;
  height: 20px;
  background: ${({ theme }) => theme.background.skeleton};
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

export const SkeletonText = styled.p`
  width: 100%;
  height: 20px;
  background: ${({ theme }) => theme.background.skeleton};
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;
