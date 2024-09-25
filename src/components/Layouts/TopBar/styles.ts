import styled from "@emotion/styled";
import Link from "next/link";

export const Stack = styled.div`
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    align-items: center;
`;

export const LogoLink = styled(Link)`
    grid-column: 1 / span 1;
    display: flex;
    width: fit-content;
`;

export const NavWrapper = styled.div`  
    display: none;  

    @media ${({ theme }) => theme.media.large} {
        grid-column: span 7;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
`;

export const SelectsWrapper = styled.div`  
    display: none;  

    @media ${({ theme }) => theme.media.large} {
        grid-column: span 2;
        display: flex;
        gap: 20px;
    }

    @media ${({ theme }) => theme.media.xl} {
        gap: 52px;
    }
`;

export const ButtonWrapper = styled.div`  
    grid-column: span 2;
`;

export const BurgerButtonWrapper = styled.div`
    grid-column: -4 / -3;
    display: flex;

    @media ${({ theme }) => theme.media.large} {
        display: none;
    }
`;