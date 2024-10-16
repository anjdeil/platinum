import styled from "@emotion/styled";

export const BadgeWrapper = styled.span<{ count: number }>`
    display: ${({ count }) => (count > 0 ? 'inline-block' : 'none')};
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.33;
    font-weight: 400;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: ${({ theme }) => `2px solid ${theme.colors.white}`};
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
`;
