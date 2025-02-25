import styled from "@emotion/styled";

export const StyledNotification = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.colors.grey};
`;
