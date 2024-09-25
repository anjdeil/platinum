import styled from "@emotion/styled";

export const StyledListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 5px;

    @media ${({ theme }) => theme.media.medium} {
        flex-direction: column;
        gap: 16px;
    }    
`;