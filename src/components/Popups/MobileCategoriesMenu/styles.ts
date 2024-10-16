import styled from "@emotion/styled";

export const TitleWrapper = styled.div`    
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    padding-inline: 16px;
    
    &:hover {
        font-weight: 600;
    }
`;

export const BackButton = styled.button`
    display: flex;
    border: none;
    background-color: transparent;
    padding: 0;
`;

export const Title = styled.div`
    font-size: 12px;
    line-height: 16px;    
    text-transform: uppercase;   
`;
