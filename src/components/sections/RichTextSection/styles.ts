import styled from "@emotion/styled";
type StyledRichTextSectionProps = {
  is_reverse?: boolean;
};

export const StyledTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.titleH2SemiBold};
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  margin-bottom: 24px;

  @media ${({ theme }) => theme.media.xl} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
    margin-bottom: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
    margin-bottom: 24px;
  }
`;

export const StyledRichTextSection = styled.div<StyledRichTextSectionProps>`
  h1 {
    font: ${({ theme }) => theme.fonts.titleH2SemiBold};
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;
    margin-bottom: 24px;

    @media ${({ theme }) => theme.media.xl} {
      font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
      margin-bottom: 16px;
    }

    @media ${({ theme }) => theme.media.medium} {
      font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
      margin-bottom: 24px;
    }
  }

  h2 {
    font: ${({ theme }) => theme.fonts.titleH2SemiBold};
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;
    margin-bottom: 16px;

    @media ${({ theme }) => theme.media.xl} {
      font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
    }

    @media ${({ theme }) => theme.media.medium} {
      margin-bottom: 24px;
    }
  }

  h3 {
    font: ${({ theme }) => theme.fonts.titleH2Medium};
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;
    margin-bottom: 16px;

    @media ${({ theme }) => theme.media.xl} {
      font: ${({ theme }) => theme.fonts.bodyMiddleMedium};
      line-height: 1.5;
    }

    @media ${({ theme }) => theme.media.medium} {
      margin-bottom: 24px;
    }
  }

  p {
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 16px;

    @media ${({ theme }) => theme.media.medium} {
      font: ${({ theme }) => theme.fonts.bodypresmallReg};
      margin-bottom: 8px;
    }
  }

  a {
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }

    &:visited {
      color: ${({ theme }) => theme.colors.black};
    }

    @media ${({ theme }) => theme.media.medium} {
      font: ${({ theme }) => theme.fonts.bodypresmallReg};
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    ${({ is_reverse }) => is_reverse && 'flex-direction: column-reverse;'}

    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    color: ${({ theme }) => theme.colors.black};

    @media ${({ theme }) => theme.media.largePlus} {
      font: ${({ theme }) => theme.fonts.bodypresmallReg};
    }

    @media ${({ theme }) => theme.media.medium} {
      gap: 8px;
    }

    li {
      font: ${({ theme }) => theme.fonts.bodyMiddleReg};
      color: ${({ theme }) => theme.colors.black};
      list-style: none;
      position: relative;
      padding-left: 30px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background-image: url('/assets/icons/done-icon.svg');
        background-size: cover;
        background-repeat: no-repeat;
      }

      @media ${({ theme }) => theme.media.largePlus} {
        font: ${({ theme }) => theme.fonts.bodypresmallReg};
        line-height: 1.5;
      }
    }
  }
`;