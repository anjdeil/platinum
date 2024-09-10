import { MenusContext } from '@/components/Layout/Layout';
import { wpMenuProps } from '@/types/layouts/Menus';
import { MenuItemsType } from '@/types/services/customApi/Menu/MenuItemsType';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { FC, useContext } from 'react';
import { MenuSkeleton } from '../MenuSkeleton';
import styles from './styles.module.scss';

const Nav: FC<wpMenuProps> = ({ menuId, className = "", classItem = "", classList = "",skeleton }) => {
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
        <Box className={`${className && className}`}>
            <nav>
                <ul className={`list-reset ${styles.nav__list} ${classList}`}>
                    {menuItems && menuItems.map(({ title, url }) => (
                        <li key={title} className={classItem}>
                            <Link className={`desc nav-link link ${styles.nav__item} ${classItem}`} href={url}>
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </Box >
    );
};

export default Nav;