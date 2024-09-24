import { StyledInfoContainerProps } from "@/types/layouts/Account";
import styled from "@emotion/styled";

export const StyledInfoContainer = styled.a<StyledInfoContainerProps>`
    box-sizing: border-box;
    width: 100%;
    padding: 20.5px 8px;
    border-radius: 8px;
    background: ${({ theme }) => theme.background.secondary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    text-decoration: none;

    @media ${({ theme }) => theme.media.medium} {
        padding: 20px 2px;
    }
    @media ${({ theme }) => theme.media.large} {
        padding: 20.5px 23.5px;
    }
`;

export const StyledInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase; 
    
    @media ${({ theme }) => theme.media.medium} {
        gap: 8px;
    }

    @media ${({ theme }) => theme.media.large} {
        gap: 10px;
    }
`;

export const StyledTitle = styled.span`
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
`
