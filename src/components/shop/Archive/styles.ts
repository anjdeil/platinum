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
    display: flex;
    align-items: center;
    
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


