import { MenusContext } from '@/components/Layout/Layout';
import { wpMenuProps } from '@/types/layouts/Menus';
import { MenuItemsType } from '@/types/services/customApi/Menu/MenuItemsType';
import Link from 'next/link';
import { FC, useContext } from 'react';
import styled from 'styled-components';
import { MenuSkeleton } from '../MenuSkeleton';

const NavList = styled.ul<{ gap?: string, topbar?: boolean }>`
    display: flex;
    padding: 0;
    gap: 40px;
    justify-content: ${({ topbar }) => (topbar ? 'center' : 'space-between')};
    list-style: none;
    align-items: center;

    @media (max-width: 1200px) {
        gap: 0 20px;
    }

    &.hamburger-menu {        
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;

        a {
            color: ${({ theme }) => theme.colors.black};
            display: block;
            font-weight: 400;
            transition: .2s ease;
            text-transform: none;
            text-align: left;

            &:hover,
            &.active {
                font-weight: 600;
            }
        }
    }
`;

const NavItem = styled(Link) <{ topbar?: boolean }>`
    display: inline-block;
    font-size: ${({ topbar }) => (topbar ? '16px' : '14px')};    
    font-weight: 400;
    line-height: 1.5em;
    text-decoration: none;
    text-align: center;
    transition: all 0.2s ease;
    color: ${({ topbar, theme }) => (topbar ? theme.colors.black : theme.colors.white)};
    text-transform: ${({ topbar }) => (topbar ? 'none' : 'uppercase')};
    min-width: ${({ topbar }) => (topbar ? 'unset' : '80px')};

    &:hover {
        font-weight: 600;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
    }
`;

const Nav: FC<wpMenuProps> = ({ menuId, className='', skeleton, topbar = false }) => {
    const menus: MenuItemsType[] | undefined = useContext(MenusContext);
    const menuItems = menus?.find(({ id }) => id === menuId)?.items;
    
    if (!menuItems && skeleton) {
        return (
            <MenuSkeleton
                elements={skeleton.elements}
                isColumn={skeleton.isColumn}
                width={skeleton.width}
                height={skeleton.height}
                gap={skeleton.gap}
            />
        )
    }    

    return (
        <nav>
            <NavList topbar={topbar} className={className}>
                {menuItems && menuItems.map(({ title, url }) => (
                    <li key={title}>
                        <NavItem topbar={topbar}  href={url}>
                            {title}
                        </NavItem>
                    </li>
                ))}
            </NavList>
        </nav>
    );
};

export default Nav;