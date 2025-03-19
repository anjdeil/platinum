import { MenusContext } from '@/components/Layout/Layout';
import { wpMenuProps } from '@/types/menus/WpMenus';
import { menuItemsType } from '@/types/services/wpCustomApi/menus';
import { FC, useContext } from 'react';
import { MenuSkeleton } from '../MenuSkeleton';
import { NavLink, NavList, StyleNav } from './styles';

const Nav: FC<wpMenuProps> = ({
  menuId,
  skeleton,
  justify,
  color,
  texttransform,
  fontSize,
  fontsizemob,
  direction,
  textalign,
  align,
  gap,
  mobGap,
  lineHeight,
}) => {
  const menus: menuItemsType[] | undefined = useContext(MenusContext);
  const menuItems = menus?.find(({ id }) => id === menuId)?.items;

  if (!menuItems && skeleton) {
    return (
      <MenuSkeleton
        elements={skeleton.elements}
        direction={skeleton.direction}
        width={skeleton.width}
        height={skeleton.height}
        gap={skeleton.gap}
        light={skeleton.light}
        dark={skeleton.dark}
        leftSide={skeleton.leftSide}
      />
    );
  }
  const sortedMenuItems = menuItems
    ? [...menuItems].sort((a, b) => a.menu_order - b.menu_order)
    : [];

  return (
    <StyleNav>
      <NavList
        justify={justify}
        direction={direction}
        align={align}
        gap={gap}
        mobGap={mobGap}
      >
        {menuItems &&
          sortedMenuItems.map(({ title, url }) => (
            <li key={title}>
              <NavLink
                href={url}
                color={color}
                texttransform={texttransform}
                textalign={textalign}
                fontsizemob={fontsizemob}
                fontSize={fontSize}
                lineHeight={lineHeight}
              >
                {title}
              </NavLink>
            </li>
          ))}
      </NavList>
    </StyleNav>
  );
};

export default Nav;
