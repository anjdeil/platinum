import styled from "@emotion/styled";
import Image from "next/image";

export const ButtonStyled = styled.button`
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.background.secondary};
    width: 100%;
    text-transform: none;
    font-size: 1rem;
    line-height: 24px;
    font-weight: 400;
    justify-content: space-between;
    border-radius: 10px;
    padding: 8px 16px;
    color: ${({ theme }) => theme.colors.grey};
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    }
`;

export const IconStyled = styled(Image)`
    margin-left: auto;
`;