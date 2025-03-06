import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";

const waveAnimation = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const StyledTable = styled.table`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 7px 7px 0 0;
    overflow: hidden;
`;

export const StyledHead = styled.thead`
    box-sizing: border-box;
    width: 100%;
    min-height: 56px;
    background-color: ${({ theme }) => theme.colors.lightBorder};
    padding: 12px;
    display: flex;
    text-transform: uppercase;
    align-items: center;

    & tr, 
    & th {
       font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    }

    @media ${({ theme }) => theme.media.large} {
        & tr, 
        & th {
            font: ${({ theme }) => theme.fonts.bodysmallReg};
        }         
    }

    @media ${({ theme }) => theme.media.mediumLarge} {
        display: none;
    }
`;

export const StyledTr = styled.tr`
    box-sizing: border-box;
    width: 100%;   
    align-items: center;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 12px;

    @media ${({ theme }) => theme.media.mediumLarge} {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center
    }
`;

export const StyledBody = styled.tbody`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 0;

    @media ${({ theme }) => theme.media.mediumLarge} {
        row-gap: 16px;
    }  
`;

export const StyledBodyTr = styled(StyledTr)`
    padding: 16px;
    border-radius: 0;
    border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
    border-top: none;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    align-items: center;

    @media ${({ theme }) => theme.media.large} {
        padding: 8px;
    }

    @media ${({ theme }) => theme.media.mediumLarge} {
        padding: 16px;
        flex-direction: column;        
        row-gap: 16px;
        border-radius: 8px;
        border-top: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
    }
`;

export const StyledTh = styled.th`
    grid-column: span 2;
    text-align: center;

    &:first-of-type {
        grid-column: span 1;
    }
`;

export const StyledDetailesTh = styled(StyledTh)`
    grid-column: span 3;
`;

export const StyledTd = styled.td`
    text-align: center;
    grid-column: span 2;

    &:first-of-type {
        grid-column: span 1;
    }

    & a {
        text-decoration: none;
    }

    @media ${({ theme }) => theme.media.mediumLarge} {
        width: 100%;
    }
`;

export const StyledEmptyTd = styled.td`
    text-align: center;
    color: ${({ theme }) => theme.colors.grey};

    @media ${({ theme }) => theme.media.mediumLarge} {
        width: 100%;
    }
`;

export const StyledActionsTd = styled(StyledTd)`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-evenly;
`;

export const StyledDetailesTd = styled(StyledTd)`
    grid-column: span 3;
`;

export const StyledNoAndDate = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & span:first-of-type {
        margin: auto;
    }

    & span:last-of-type {
        display: none;
    }

    @media ${({ theme }) => theme.media.mediumLarge} {
        & span:first-of-type {
            margin: unset;
        }

        & span:last-of-type {
            display: unset;
        }
    }    
`;

export const StyledSpan = styled.span`
    font: ${({ theme }) => theme.fonts.bodyMiddleReg}; 

    @media ${({ theme }) => theme.media.large} {
        font: ${({ theme }) => theme.fonts.bodysmallReg}; 
    }
`;

export const StyledDateTd = styled(StyledTd)`
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};

    @media ${({ theme }) => theme.media.large} {        
        font: ${({ theme }) => theme.fonts.bodysmallReg};
    }

    @media ${({ theme }) => theme.media.mediumLarge} {        
        display: none;
    }
`;

export const StyledTotalSpan = styled.span`
    display: block;
    text-align: left;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg}; 

    @media ${({ theme }) => theme.media.large} {        
        font-size: 14px;
    }
`;

export const StyledOrderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span:first-of-type {
        display: none;
    }

    & span:last-of-type {
        margin: auto;
    }

    @media ${({ theme }) => theme.media.mediumLarge} {
        & span:first-of-type {
            display: unset;
        }

        & span:last-of-type {
            margin: unset;
        }
    }  
`;

export const StyledOrderSpan = styled(StyledSpan)`
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};   

    @media ${({ theme }) => theme.media.large} {        
        font-size: 14px;
    }

    @media ${({ theme }) => theme.media.mediumLarge} {
        text-transform: uppercase;
        font: ${({ theme }) => theme.fonts.bodysmallReg}; 
    }
`;

export const StyledOrderButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const StyledLinkMobileButton = styled(Link)`
    display: none;

    @media ${({ theme }) => theme.media.mediumLarge} {
        display: flex;
        flex-grow: 1;
    }
`;

export const StyledLinkDesktopButton = styled(Link)`
    display: flex;

    @media ${({ theme }) => theme.media.mediumLarge} {
        display: none;
    }
`;

export const SkeletonSpan = styled(StyledSpan)`
    display: inline-block;
    width: 80%;
    height: 1.2em;
    border-radius: 4px;
    background: ${({ theme }) => theme.background.skeleton};
    background-size: 200% 100%;
    animation: ${waveAnimation} 1.5s infinite ease-in-out;

    @media ${({ theme }) => theme.media.mediumLarge} {
        width: 100%;
    }
`;

export const SkeletonIcon = styled(SkeletonSpan)`
    width: 28px;
    height: 28px;

    @media ${({ theme }) => theme.media.mediumLarge} {
        width: 28px;
    }
`;

export const SkeletonButton = styled(SkeletonIcon)`
    @media ${({ theme }) => theme.media.mediumLarge} {
        width: 100%;
        height: 40px;
        border-radius: 8px;
    }
`;
