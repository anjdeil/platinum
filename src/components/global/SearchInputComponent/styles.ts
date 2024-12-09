import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

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
        box-shadow: none;
        outline: none;
    }
`;

export const SearchInputIcons = styled.div`
    display: flex;
    gap: 10px;
    padding: 0 3px
`;

export const SearchInputLoadingIcon = styled(CircularProgress)`
    color: rgba(0,0,0,.15);
`;