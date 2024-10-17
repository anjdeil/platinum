import { SearchFormProps, SearchInputProps } from "@/types/global/SearchBar";
import styled from "@emotion/styled";

export const SearchForm = styled.form<SearchFormProps>`
    position: relative;
    display: flex;
    align-items: center;
    height: ${({ height = '40px' }) => height};
`;

export const SearchInput = styled.input<SearchInputProps>`
    box-sizing: border-box;
    width: ${({ width = '100%' }) => width};
    border-radius: 8px;
    padding: 8px 16px 8px 11px;
    background-color: ${({ theme, backgroundColor = theme.background.secondary }) => backgroundColor};
    border: none;
    outline: none;
    line-height: 1.5em;
    box-shadow: none;
    flex: 1;

    &::placeholder {
        color: #999;
    }

    &:hover {
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    }

    &:focus {
        box-shadow: none;
    }
`;

export const SearchIcon = styled.div`
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
`;