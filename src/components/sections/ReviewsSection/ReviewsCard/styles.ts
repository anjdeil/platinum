import { Text } from '@/styles/components';
import styled from '@emotion/styled';
import { Collapse } from '@mui/material';

export const ReviewContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 16px;
  padding-bottom: ${({ isOpen }) => (isOpen ? '' : '40px')};
  row-gap: 16px;
  height: 100%;

  &:hover > span {
    -webkit-line-clamp: unset;
    overflow: visible;
  }

  @media ${({ theme }) => theme.media.large} {
    row-gap: 8px;
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;
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
  align-self: flex-start;

  & img {
    width: 100%;
    height: 100%;
  }

  @media ${({ theme }) => theme.media.large} {
    width: 34px;
  }
`;

export const ReviewName = styled(Text)`
  word-break: break-word;
  width: 70%;
  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }
`;

export const ReviewText = styled(Collapse)`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  word-break: break-word;

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }
`;

export const MoreButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.grey};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }
`;
