import { MenusContext } from '@/components/Layout/Layout';
import { MenuItemsType } from '@/types/services/customApi/Menu/MenuItemsType';
import { FC, useContext } from 'react';
import { MenuSkeleton } from '../MenuSkeleton';
import { NavLink, NavList } from './styles';
import { wpMenuProps } from '@/types/menus/WpMenus';

const Nav: FC<wpMenuProps> = ({
    menuId,
    skeleton,
    justify,
    color,
    textTransform,
    fontSize,
    fontSizeMob,
    direction,
    textAlign,
    align,
    gap,
    mobGap,
}) => {
    const menus: MenuItemsType[] | undefined = useContext(MenusContext); 
    const menuItems = menus?.find(({ id }) => id === menuId)?.items;
    
    if (!menuItems && skeleton) {
        return (
            <MenuSkeleton
                elements={skeleton.elements}
                direction={skeleton.direction}
                width={skeleton.width}
                height={skeleton.height}
                gap={skeleton.gap}
            />
        )
    }    

    return (
        <nav>
            <NavList
                justify={justify}
                direction={direction}
                align={align}
                gap={gap}
                mobGap={mobGap}
            >
                {menuItems && menuItems.map(({ title, url }) => (
                    <li key={title}>
                        <NavLink
                            href={url}
                            color={color}
                            textTransform={textTransform}
                            textAlign={textAlign}
                            fontSizeMob={fontSizeMob}
                            fontSize={fontSize}
                        >
                            {title}
                        </NavLink>
                    </li>
                ))}
            </NavList>
        </nav>
    );
};

export default Nav;