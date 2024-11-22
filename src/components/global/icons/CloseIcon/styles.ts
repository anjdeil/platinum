import styled from "@emotion/styled";
import { CloseProps } from "./CloseIcon";


export const CloseButton = styled.button<CloseProps>`
    display: flex;
    padding: ${({padding}) => padding || "10px"};
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    align-items: top;

    &:hover {
        scale: 1.2;
    }
`;