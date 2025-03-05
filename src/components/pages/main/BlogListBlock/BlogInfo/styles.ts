import { Text } from '@/styles/components';
import styled from '@emotion/styled';

type StyledViewCountProps = {
  postPage?: boolean;
};

export const StyledInfo = styled.div<StyledViewCountProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ postPage }) =>
    postPage ? 'flex-start' : 'space-between'};
  gap: ${({ postPage }) => (postPage ? '24px' : '0')};
  width: 100%;
`;

export const StyledDate = styled(Text)`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  color: ${({ theme }) => theme.colors.grey};
  text-transform: uppercase;

  @media ${({ theme }) => theme.media.mediumLarge} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;

export const StyledViewCount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledViewCountNumber = styled.div`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  color: ${({ theme }) => theme.colors.grey};

  @media ${({ theme }) => theme.media.mediumLarge} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;
