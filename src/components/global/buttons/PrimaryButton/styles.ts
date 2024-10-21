import styled from "@emotion/styled";

export const StyledPrimaryButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 16px;
    width: 100%;
    color: ${({ theme }) => theme.colors.white};
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    border-radius: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    transition: background-color .15s ease-in-out;
 
    :hover {
     background-color: ${({ theme }) => theme.background.hover}
    }

    :disabled {
        background-color: ${({ theme }) => theme.colors.grey};
        color: ${({ theme }) => theme.colors.black}
    }
 `