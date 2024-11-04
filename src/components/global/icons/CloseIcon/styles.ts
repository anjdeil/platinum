import styled from "@emotion/styled";

export const CloseButton = styled.button`
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content:center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        scale: 1.2;
    }
`;