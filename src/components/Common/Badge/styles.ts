import styled from "@emotion/styled";

export const BadgeWrapper = styled.span<{ count: number }>`
     display: ${({ count }) => (count > 0 ? 'flex' : 'none')};
    box-sizing: border-box;
    font: ${({ theme }) => theme.fonts.bodysmallReg}; 
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: ${({ theme }) => `2px solid ${theme.colors.white}`};
    border-radius: 50%;
    position: absolute;
    top: -6px;
    right: -8px;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
`;
