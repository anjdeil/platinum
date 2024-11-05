import styled from "@emotion/styled";

export const TitleWrapper = styled.div`    
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 15px;  
`;


export const BackButton = styled.button`
    display: flex;
    border: none;
    background-color: transparent;
    padding: 0;
`;

export const Title = styled.div`
    font: ${({ theme }) => theme.fonts.bodyMiddleMedium}; 
    text-transform: uppercase; 
   
`;

export const MobileCategoriesSkeletonWrapper = styled.div`
    padding-top: 30px;
    display: flex;
    justify-content: center;
    background-color:   ${({ theme }) => theme.colors.white}; 
    position: fixed;
    z-index: 90;
    inset: 0;
  
`;
export const TabletCategoriesSkeletonWrapper = styled.div`
    padding: 20px 0;
   
`;
