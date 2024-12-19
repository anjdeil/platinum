import styled from '@emotion/styled';

export const StyledContentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 108px;
  gap: 24px;

  @media ${({ theme }) => theme.media.large} {
    padding: 0;
  }
`;

export const StyledParagraph = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
`;

export const StyledHeading = styled.h3`
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  text-transform: uppercase;
`;

export const StyledFigcaption = styled.figcaption`
  font: ${({ theme }) => theme.fonts.bodysmallReg};
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 8px;
`;

export const StyledBlockquote = styled.blockquote`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding-left: 16px;
`;

export const StyledOrderedList = styled.ol`
  list-style-type: decimal;
  margin-left: 20px;
`;

export const StyledListItem = styled.li`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledImageWrapper = styled.div`
  max-width: 1064px;
  height: 477px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  @media ${({ theme }) => theme.media.large} {
    height: 274px;
  }

  img {
    display: block;
    object-fit: cover;
  }
`;
