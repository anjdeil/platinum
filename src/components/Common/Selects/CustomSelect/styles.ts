import styled from "@emotion/styled";

interface MenuProps {
    isOpen?: boolean;
}

export const SortSelectStyled = styled.div<MenuProps>`
    box-sizing: border-box;
    width: 53px;
    height: 32px;
    position: relative;
    background: transparent;
    display: flex;
    align-items: center;
    padding: 4px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    cursor: pointer;
`;

export const StyledSelect = styled.select`
  display: none;
`;

export const DropdownMenu = styled.div<MenuProps>`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.white};
    z-index: 1000;
    transition: height 0.3s ease-out, opacity 0.3s ease-out;
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

export const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.background.secondary};
    }    
`;

export const Arrow = styled.svg<MenuProps>`
    margin-left: auto;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;