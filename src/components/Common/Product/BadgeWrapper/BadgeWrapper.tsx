import { FC, ReactNode } from "react";
import styled from "styled-components";

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
