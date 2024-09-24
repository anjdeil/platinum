import styled from "@emotion/styled";

export const StyledListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    @media ${({ theme }) => theme.media.medium} {
        flex-direction: row;
        gap: 5px;
    }
    @media ${({ theme }) => theme.media.large} {
        gap: 16px;
    }
`;