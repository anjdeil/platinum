import styled from '@emotion/styled';

interface PopupBodyProps {
  maxWidth?: string;
  padding?: string;
  tabletPadding?: string;
  mobilePadding?: string;
}
export const PopupOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  inset: 0;
`;

export const PopupBody = styled.div<PopupBodyProps>`
  box-sizing: border-box;
  max-width: ${({ maxWidth }) => maxWidth || '791px'};
  width: 100%;
  height: auto;
  padding: ${({ padding }) => padding || '64px'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.media.large} {
    max-width: ${({ maxWidth }) => maxWidth || '622px'};
    padding: ${({ tabletPadding }) => tabletPadding || '72px 80px'};
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 95%;
    padding: ${({ mobilePadding }) => mobilePadding || '20px'};
  }
`;

export const PopupContainer = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
`;

export const CloseWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 4px;
  right: 4px;

  @media ${({ theme }) => theme.media.medium} {
    top: 18px;
    right: 18px;
  }
`;
