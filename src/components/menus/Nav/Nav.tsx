import { MenusContext } from '@/components/Layout/Layout';
import { FC, useContext } from 'react';
import { MenuSkeleton } from '../MenuSkeleton';
import { NavLink, NavList } from './styles';
import { menuItemsType } from '@/types/services/wpCustomApi/menus';
import { wpMenuProps } from '@/types/menus/WpMenus';

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
      />
    );
  }

  if (!menuItems && skeleton) {
    return (
      <MenuSkeleton
        elements={skeleton.elements}
        direction={skeleton.direction}
        width={skeleton.width}
        height={skeleton.height}
        gap={skeleton.gap}
      />
    );
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
        {menuItems &&
          menuItems.map(({ title, url }) => (
            <li key={title}>
              <NavLink
                href={url}
                color={color}
                texttransform={texttransform}
                textalign={textalign}
                fontsizemob={fontsizemob}
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
