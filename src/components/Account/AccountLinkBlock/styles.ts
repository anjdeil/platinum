import { StyledInfoContainerProps } from "@/types/layouts/Account";
import styled from "@emotion/styled";

export const StyledInfoContainer = styled.a<StyledInfoContainerProps>`
    box-sizing: border-box;
    width: 100%;
    padding: 20.5px 23.5px;    
    border-radius: 8px;
    background: ${({ theme }) => theme.background.secondary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;

    @media ${({ theme }) => theme.media.large} {
        padding: 20px 2px;
    }

    @media ${({ theme }) => theme.media.medium} {
        padding: 20.5px 8px;        
    }

    &:hover {
        background: ${({ theme }) => theme.background.primaryGradient};

        & span {
            color: ${({ theme }) => theme.colors.white};
        }

        & path[stroke] {
            stroke: ${({ theme }) => theme.colors.white};
        }
        & path[fill] {
            fill: ${({ theme }) => theme.colors.white};
        }
    }
`;

export const StyledInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;    
`;

export const StyledTitle = styled.span`
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
`
