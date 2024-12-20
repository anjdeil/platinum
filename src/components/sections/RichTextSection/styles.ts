import styled from "@emotion/styled";

export const StyledTitle = styled.h2`
  font: ${({ theme }) => theme.fonts.titleH2SemiBold};
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  margin-bottom: 24px;

  @media ${({ theme }) => theme.media.xl} {
    font: ${({ theme }) => theme.fonts.bodyMiddleMedium};
    font-weight: 600;
    margin-bottom: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
    margin-bottom: 24px;
  }
`;

export const StyledSubtitle = styled.h3`
  font: ${({ theme }) => theme.fonts.bodyMiddleMedium};
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  margin-bottom: 16px;

  @media ${({ theme }) => theme.media.xl} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
    font-weight: 500;
    line-height: 1.5;
  }

  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 24px;
  }
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.media.largePlus} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;

export const StyledItem = styled.li`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  color: ${({ theme }) => theme.colors.black};
  list-style: none;
  position: relative;
  padding-left: 30px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    background-image: url("/assets/icons/done-icon.svg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  @media ${({ theme }) => theme.media.largePlus} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
    line-height: 1.5;
  }
`;