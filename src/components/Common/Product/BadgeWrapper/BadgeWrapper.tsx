import styled from "@emotion/styled";
import { FC, ReactNode } from "react";

const StyledBadgeWrapper = styled.div`
     width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
`;

interface BadgeWrapperProps {
    children: ReactNode;
}

export const BadgeWrapper: FC<BadgeWrapperProps> = ({ children }) => {
    return <StyledBadgeWrapper>{children}</StyledBadgeWrapper>;
};
