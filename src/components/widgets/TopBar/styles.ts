import styled from "@emotion/styled";

export const Stack = styled.div`
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: center;
`;

export const NavWrapper = styled.div`
    grid-column: span 7;
    display: flex;
    justify-content: space-evenly;
    align-items: center;     

    @media ${({ theme }) => theme.media.large} {
        display: none;  
    }
`;

export const SelectsWrapper = styled.div`
    gap: 52px;
    grid-column: span 2;
    display: flex;

    @media ${({ theme }) => theme.media.xl} {
        gap: 20px;
    }

    @media ${({ theme }) => theme.media.large} {        
        display: none;  
    }    
`;

export const ButtonWrapper = styled.div`
    max-width: fit-content;
`;

export const BurgerButtonWrapper = styled.div`
    display: none;

    @media ${({ theme }) => theme.media.large} {
        display: flex;
        margin-left: auto;
    }
`;