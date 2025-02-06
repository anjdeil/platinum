import { Container } from '@/styles/components';
import styled from '@emotion/styled';

export const CatalogContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const CatalogTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-top: 24px;
`;

export const CatalogTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

export const FilterSortWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${({ theme }) => theme.media.medium} {
    flex-direction: row-reverse;
    justify-content: space-between;
    flex-grow: 1;
  }
`;

export const FilterWrapper = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.middle} {
    display: block;
  }
`;

export const PagesNavigationWrapper = styled.div`
  @media ${({ theme }) => theme.media.medium} {
    display: none;
  }
`;

export const PagesNavigationFooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

export const CountProduct = styled.span`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};

  @media ${({ theme }) => theme.media.middle} {
    display: none;
  }
`;

export const CatalogLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
`;

export const CatalogFilterBlock = styled.div<{ visible: boolean }>`
  grid-column: span 3;
  box-sizing: border-box;
  display: block;
  @media ${({ theme }) => theme.media.middle} {
    width: 350px;
    position: absolute;
    left: 0%;
    top: 145px;
    z-index: 12;
    padding: 24px 32px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    background-color: ${({ theme }) => theme.colors.white};
  }
  @media ${({ theme }) => theme.media.medium} {
    overflow-y: auto;
    width: 100%;
    left: 0;
    right: 0;
    height: 100%;
    top: 60px;
  }
`;

export const CatalogRightWrapper = styled.div<{ search?: string }>`
  grid-column: ${({ search }) => search ? '1 / -1' : 'span 9'};
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  @media ${({ theme }) => theme.media.middle} {
    grid-column: 1 / -1;
  }
`;

export const CatalogListBlock = styled.div`
  grid-column: span 9;

  @media ${({ theme }) => theme.media.middle} {
    grid-column: 1 / -1;
  }
`;

export const SortPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
export const FilterNCategoriesHead = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  align-items: center;
  margin-bottom: 20px;
  & h4 {
    grid-column: 2 / 3;
    margin: 0;
  }

  & button {
    grid-column: 4 / 5;
    margin: 0;
  }
`;
export const FilterOverlay = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;

  @media ${({ theme }) => theme.media.large} {
    display: ${({ visible }) => (visible ? 'block' : 'none')};
  }

  @media ${({ theme }) => theme.media.medium} {
    display: none;
  }
`;
export const FilterNCategoriesMenu = styled.div``;
