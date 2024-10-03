import styled from "@emotion/styled";

export const NotificationWrapper = styled.div<{ type?: "success" | "warning" | "info" }>`
    padding: 16px;
    margin-bottom: 24px;
    border-radius: 8px;
    background-color: ${({ type, theme }) => {
        switch (type) {
            case "info":
                return theme.background.secondary;
            case "warning":
                return theme.background.warning;
            case "success":
                return theme.background.success;
            default:
                return theme.background.secondary;
        }
    }};
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;