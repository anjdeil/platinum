import styled from "@emotion/styled";

interface MenuProps
{
    isOpen?: boolean;
}

export const StyledArrow = styled.svg<MenuProps>`
    margin-left: auto;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;