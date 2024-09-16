import { MenusContext } from '@/components/Layout/Layout';
import { wpMenuProps } from '@/types/layouts/Menus';
import { MenuItemsType } from '@/types/services/customApi/Menu/MenuItemsType';
import { FC, useContext } from 'react';
import { MenuSkeleton } from '../MenuSkeleton';
import { NavLink, NavList } from './styles';
import theme from '@/styles/theme';

const Nav: FC<wpMenuProps> = ({ menuId, className = '', skeleton }) =>
{
    const menus: MenuItemsType[] | undefined = useContext(MenusContext);
    const menuItems = menus?.find(({ id }) => id === menuId)?.items;

    if (!menuItems && skeleton)
    {
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
            <NavList className={className}>
                {menuItems && menuItems.map(({ title, url }) => (
                    <li key={title}>
                        <NavLink color={theme.colors.black} href={url}>
                            {title}
                        </NavLink>
                    </li>
                ))}
            </NavList>
        </nav>
    );
};

export default Nav;