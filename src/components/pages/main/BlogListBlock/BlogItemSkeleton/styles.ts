import styled from '@emotion/styled';
import { ImageBlock } from '../BlogItem/styles';

export const SkeletonWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
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

export const SkeletonImage = styled(ImageBlock)`
  border-radius: 8px;
  background: ${({ theme }) => theme.background.skeleton};
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
`;

export const SkeletonText = styled(SkeletonWrapper)`
  width: 100%;
  height: 24px;
`;

export const SkeletonDate = styled(SkeletonWrapper)`
  width: 30%;
  height: 20px;
  align-self: flex-start;
`;

export const SkeletonContent = styled(SkeletonWrapper)`
  width: 100%;
  height: 40px;
`;

export const SkeletonButton = styled(SkeletonWrapper)`
  width: 30%;
  height: 20px;
  align-self: flex-start;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 8px;
`;
