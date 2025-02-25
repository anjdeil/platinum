import styled from "@emotion/styled";
import Link from "next/link";

export const StyledButtonLink = styled(Link)`
    position: fixed;
    bottom: 40px;
    right: 20px;
    z-index: 100;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.2);
        svg {            
            transition: all 0.2s ease;
            filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3));
        }
    }

    @media ${({ theme }) => theme.media.medium} {
        bottom: 80px;
    }
`;
