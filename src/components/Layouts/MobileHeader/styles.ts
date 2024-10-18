import { Container } from "@/styles/components";
import { HeaderWrapperProps } from "@/types/layouts/Header";
import styled from "@emotion/styled";

export const MobileHeaderWrapper = styled.div<HeaderWrapperProps>`
    padding-block: 6px;
    background: ${({ theme, backgroundColor = theme.background.primaryGradient }) => backgroundColor};
`;

export const MobileHeaderContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
`;

export const SearchWrapper = styled.div`
    flex-grow: 1;
`;

export const IconButton = styled.div`
    display: flex;
    padding: 0;

    & a {
        display: flex;
    }
`;