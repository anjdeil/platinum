import { Overlay } from "@/styles/components";
import styled from "@emotion/styled";

export const GridBox = styled.div`
   
    display: grid;
    grid-template-columns: 3fr 9fr;

    @media ${({ theme }) => theme.media.middle} {
    grid-template-columns: 1fr;
    }

   
`;
export const SortPanel = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;
export const FilterNCategoriesHead = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr auto;
    align-items: center;
    & h4 {
        grid-column: 2 / 3;
        margin: 0; 
    }

    & button {
        grid-column: 4 / 5;
        margin: 0; 
    }
`;
export const FilterOverlay = styled.div<{ visible: boolean }>`
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;

    @media ${({ theme }) => theme.media.middle} {
        display: ${({ visible }) => (visible ? 'block' : 'none')};
    }

    @media ${({ theme }) => theme.media.medium} {
        display: none;
    }
`;
export const FilterNCategoriesMenu = styled.div<{ visible: boolean }>`
    display: block;
   @media ${({ theme }) => theme.media.middle} {
    max-width: 367px;
    position: absolute;
    left: 0%;
    top: 35vh;
    z-index: 10;
    padding: 24px 32px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    display: ${({ visible, theme }) => (visible ? 'block' : 'none')};
    background-color: ${({ theme  }) => theme.colors.white};
    }
   @media ${({ theme }) => theme.media.medium} {
    display: none;
    }
`;


