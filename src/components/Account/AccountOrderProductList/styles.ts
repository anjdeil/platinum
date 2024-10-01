import styled from "@emotion/styled";
import Image from "next/image";

export const ProductListWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px 8px 0 0;
    overflow: hidden;    

    @media ${({ theme }) => theme.media.medium} {
        border-radius: 8px;        
    }
`;

export const ListHeader = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: ${({ theme }) => theme.background.secondary};
    padding-block: 16px;
    display: flex;
    text-transform: uppercase;
    justify-content: space-between;
    align-items: center;

    @media ${({ theme }) => theme.media.medium} {
        display: none;
    }
`;

export const WrapperHeader = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const HeaderItem = styled.span`
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 24px;
    flex-grow: 1;

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;

export const HeaderItemName = styled(HeaderItem)`
    width: 50%;
    flex-grow: unset;
`;

export const ListBody = styled.ul`
    box-sizing: border-box;
    width: 100%;    
    display: flex;
    flex-direction: column;    
    border: 1px solid ${({ theme }) => theme.colors.silver};
    border-top: none;
    list-style: none;

    @media ${({ theme }) => theme.media.medium} {
        border-radius: 8px;
        border-top: 1px solid ${({ theme }) => theme.colors.silver};
    }
`;

export const ListItem = styled.li`
    padding: 16px;
    padding-right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media ${({ theme }) => theme.media.medium} {
        flex-direction: column;
        row-gap: 8px;
        padding-right: 16px;
    }
`;

export const WrapperBlock = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;

    @media ${({ theme }) => theme.media.medium} {
        gap: 8px;
    }
`;

export const ProductImage = styled(Image)`
    object-fit: contain;
    @media ${({ theme }) => theme.media.large} {
        width: 42px;
        height: 42px;
    }

    @media ${({ theme }) => theme.media.medium} {
        width: 60px;
        height: 60px;
    }
`;

export const StyledValue = styled.span`
    font-size: 16px;
    line-height: 24px;

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
        line-height: 22px;
    }
`;

export const WrapperBlockInfo = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media ${({ theme }) => theme.media.medium} {
        padding-left: 68px;
        flex-direction: column;
        row-gap: 16px;
    }
`;

export const BlockInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    & span:first-of-type {
        display: none;
    }

    & span:last-of-type {
        flex-grow: 1;
    }

    @media ${({ theme }) => theme.media.medium} {
        & span:first-of-type {
            display: block;
        }
        & span:last-of-type {
            flex-grow: unset;
        }
    }
`;

export const InfoTitle = styled.span`
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
`;