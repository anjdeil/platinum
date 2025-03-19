import styled from "@emotion/styled";

export const StyledNotification = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledIcon = styled.div`
  width: 24px;
  height: 24px;
`;

export const StyledText = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;

  color: ${({ theme }) => theme.colors.primary};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};

  @media ${({ theme }) => theme.media.mediumLarge} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }

  @media ${({ theme }) => theme.media.medium} {
    span {
      display: inline-block;
      text-align: center;
    }
  }
`;