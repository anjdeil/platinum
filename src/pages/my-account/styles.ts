import styled from "@emotion/styled";

export const AccountInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-bottom: 80px;
   
    @media ${({ theme }) => theme.media.large} {
        margin-bottom: 24px;
    }

    @media ${({ theme }) => theme.media.medium} {
        flex-direction: column-reverse;
        margin-bottom: 64px;
    }
`;