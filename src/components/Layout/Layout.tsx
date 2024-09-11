import { useGetMenusQuery } from '@/store/rtk-queries/wpCustomApi';
import { MenuItemsType } from '@/types/services/customApi/Menu/MenuItemsType';
import { useMediaQuery } from '@mui/material';
import { Montserrat } from 'next/font/google';
import { createContext } from 'react';
import BottomMenu from '../Layouts/BottomMenu';
import Header from '../Layouts/Header/Header';
import MobileHeader from '../Layouts/MobileHeader/MobileHeader';
import TopBar from '../Layouts/TopBar/TopBar';
import PopupContainer from '../Popups/PopupContainer';

export const MenusContext = createContext<MenuItemsType[] | undefined>(undefined);

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'], 
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});
 
export default function Layout({ children }: { children: React.ReactNode })
{
    const isMobile = useMediaQuery('(max-width: 768px)');
    const menuIds = [335, 344];

    const { data: menusData } = useGetMenusQuery({
        include: menuIds.join(',')        
    });

    const menus = menusData?.data ? menusData.data as MenuItemsType[] : [];
    console.log('menusData...', menusData);
    console.log('menus...', menus);
    
    return (
        <div className={montserrat.className}>
            <MenusContext.Provider value={menus}>
                {!isMobile && <TopBar />}
                {!isMobile ? <Header /> : <MobileHeader />}
                <PopupContainer />
                {isMobile && (<BottomMenu />)}
                {children}
            </MenusContext.Provider>
        </div>
    );
} 