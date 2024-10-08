import styled from "@emotion/styled";

export const BadgeWrapper = styled.span<{ count: number }>`
    display: ${({ count }) => (count > 0 ? 'flex' : 'none')};
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    line-height: 1.3em;
    font-weight: 400;
    width: 20px;
    aspect-ratio: 1;
    background-color: ${({ theme }) => theme.colors.primary};
    border: ${({ theme }) => `2px solid ${theme.colors.white}`};
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
`;
