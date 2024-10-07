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
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-transform: uppercase;

    @media ${({ theme }) => theme.media.medium} {
        display: none;
    }
`;

export const WrapperHeader = styled.div`
    grid-column: span 3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

export const HeaderItem = styled.span`
    grid-column: span 1;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 1.5;
    flex-grow: 1;

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;

export const HeaderItemName = styled(HeaderItem)`
    grid-column: span 2;

    @media ${({ theme }) => theme.media.large} {
        text-align: left;
    }
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
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    @media ${({ theme }) => theme.media.medium} {
        grid-template-columns: repeat(4, 1fr);
        row-gap: 8px;
    }
`;

export const WrapperBlock = styled.div`
    box-sizing: border-box;
    grid-column: span 2;
    display: flex;
    align-items: center;
    gap: 16px;

    @media ${({ theme }) => theme.media.medium} {
        gap: 8px;
        grid-column: span 4;
    }
`;

export const ProductImage = styled(Image)`
    object-fit: contain;
    @media ${({ theme }) => theme.media.large} {
        width: 42px;
        aspect-ratio: 1;
    }

    @media ${({ theme }) => theme.media.medium} {
        width: 60px;
    }
`;

export const StyledValue = styled.span`
    font-size: 16px;
    line-height: 1.5;

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;

export const WrapperBlockInfo = styled.div`
    grid-column: span 3;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @media ${({ theme }) => theme.media.medium} {
        row-gap: 16px;
        grid-column: 1 / -1;
        margin-left: 68px;
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
        grid-column: 1 / -1;

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
    line-height: 1.33;
    text-transform: uppercase;
`;