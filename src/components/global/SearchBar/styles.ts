import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import FallbackImage from '../FallbackImage/FallbackImage';

export const SearchFormWrap = styled.form`
  flex-grow: 1;
  height: 50px;
`;

interface SearchFormProps {
  searchListOpen?: boolean;
}

export const SearchForm = styled.form<SearchFormProps>`
  flex-grow: 1;
  border-radius: 15px;
  ${({ searchListOpen }) =>
    searchListOpen && `box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 20px 10px;`}
  overflow: hidden;
`;

export const SearchInputWrap = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 15px;
  box-sizing: border-box;
  gap: 10px;
`;

export const SearchInput = styled.input`
  border: none;
  flex-grow: 1;
  &:focus {
    border: none;
    box-shaddow: none;
    outline: none;
  }
`;

export const SearchInputIcons = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 3px;
`;

export const SearchInputLoadingIcon = styled(CircularProgress)`
  color: rgba(0, 0, 0, 0.15);
`;

export const SearchResults = styled.div`
  background-color: rgba(242, 248, 254, 0.9);
  backdrop-filter: blur(15px);
  max-height: 500px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
`;

export const SearchResultsGroup = styled.div`
  padding-bottom: 7px;
`;

export const SearchResultsTitle = styled.div`
  padding-top: 10px;
  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 8px;
  font-size: 0.75em;
  font-weight: 600;
  opacity: 0.4;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  line-height: 2;
`;

export const SearchResultsRows = styled.div`
  margin-left: 7px;
  margin-right: 7px;
`;

export const SearchResultsRowIcon = styled.div`
  margin-right: 10px;
  padding-top: 2px;
`;

export const SearchResultsRowImage = styled(FallbackImage)`
  margin-right: 10px;
  border-radius: 4px;
`;

export const SearchResultsRowCaption = styled.div``;

export const SearchResultsRowCaptionWrap = styled.div``;

export const SearchResultsRowCat = styled.div`
  font-size: 0.75em;
  font-weight: 600;
  opacity: 0.4;
  margin-top: 0.4em;
`;

export const SearchResultsRow = styled.button`
  display: flex;
  padding: 7px;
  border-radius: 6px;
  transition: 0.2s ease;
  cursor: pointer;
  tab-index: 1;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  font-size: 0.9em;
  align-items: center;
  background-color: transparent;
  border: none;
  text-align: left;
  width: 100%;
  &:hover,
  &:focus,
  &:focus-visible {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
