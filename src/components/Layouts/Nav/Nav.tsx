import { MenusContext } from '@/components/Layout/Layout';
import { wpMenuProps } from '@/types/layouts/Menus/wp-menus';
import { MenuItemsType } from '@/types/services/customApi/Menu/MenuItemsType';
import { FC, useContext } from 'react';
import { MenuSkeleton } from '../MenuSkeleton';
import { NavLink, NavList } from './styles';
import { menus } from '@/components/mockmenus';

const Nav: FC<wpMenuProps> = ({
    menuId,
    className='',
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
                className={className}
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