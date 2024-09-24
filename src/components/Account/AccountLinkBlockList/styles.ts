import styled from "@emotion/styled";

export const StyledListContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 16px;

    @media ${({ theme }) => theme.media.medium} {
        grid-template-columns: repeat(4, 1fr);
    }    
`;