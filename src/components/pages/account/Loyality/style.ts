import styled from '@emotion/styled';

export const LoyalityPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
export const LoyalityLevelCard = styled.div<{ isColumn?: boolean }>`
  margin-bottom: 24px;
  border-radius: 8px;
  display: flex;
  align-items: start;
  gap: ${({ isColumn }) => (isColumn ? '0' : '16px')};
  padding: 12px 16px;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background.secondary};
  flex-direction: ${({ isColumn }) => (isColumn ? 'column' : 'row')};

  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    align-items: center;
  }
`;
export const LoyalityBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media ${({ theme }) => theme.media.medium} {
    align-items: center;
    width: 100%;
  }
`;
export const LevelText = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;
`;

export const NextLevelText = styled.p`
  color: ${({ theme }) => theme.colors.active};
  text-align: right;
`;
export const LevelCodeText = styled.p`
  font: ${({ theme }) => theme.fonts.titleH2SemiBold};
  line-height: 2rem;
  text-transform: uppercase;
  margin-bottom: 8px;
`;
