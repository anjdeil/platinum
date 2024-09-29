import { Container } from "@/styles/components";
import styled from "@emotion/styled";

export const AccountContainer = styled(Container)`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    margin-top: 24px;

    @media ${({ theme }) => theme.media.medium} {
        grid-template-columns: 1fr;
    }
`;

export const SideListContainer = styled.div`
    grid-column: span 3;

    @media ${({ theme }) => theme.media.large} {
        grid-column: span 4;
    }

    @media ${({ theme }) => theme.media.medium} {
        grid-column: span 1;
    }
`;

export const AccountContent = styled.div`
    grid-column: span 9;

    @media ${({ theme }) => theme.media.large} {
        grid-column: span 8;
    }

    @media ${({ theme }) => theme.media.medium} {
        grid-column: span 1;
    }
`;