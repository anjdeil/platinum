import styled from "@emotion/styled";

export const MobileHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: 60px;
`;

export const LogoWrapper = styled.div`
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;

    & a {
        width: 100%;
        display: flex;
        align-items: center;
    }
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
