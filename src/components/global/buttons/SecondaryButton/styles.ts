import styled from "@emotion/styled";

export const StyledSecondaryButton = styled.button`
    background-color: transparent;
    padding: 16px;
    width: 100%;
    color: ${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    border-radius: 10px;
    cursor: pointer;
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