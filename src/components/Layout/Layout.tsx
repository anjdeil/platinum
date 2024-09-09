import { useGetMenusQuery } from '@/store/rtk-queries/wpCustomApi';
import { MenuItemsType } from '@/types/services/customApi/Menu/MenuItemsType';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { createContext } from 'react';
import BottomMenu from '../Layouts/BottomMenu';
import Header from '../Layouts/Header/Header';
import MobileHeader from '../Layouts/MobileHeader/MobileHeader';
import TopBar from '../Layouts/TopBar/TopBar';
import PopupContainer from '../Popups/PopupContainer';

export const MenusContext = createContext<MenuItemsType[] | undefined>(undefined);

export default function Layout({ children }: { children: React.ReactNode })
{
    const isMobile = useMediaQuery('(max-width: 768px)');
    const menuIds = [335, 344];

    const { data: menusData } = useGetMenusQuery({
        include: menuIds.join(',')
    });

    const menus = menusData?.data ? menusData.data as MenuItemsType[] : [];
    
    return (
        <Box>
            <MenusContext.Provider value={menus}>

                {!isMobile && <TopBar />}
                {!isMobile ? <Header /> : <MobileHeader />}
                <PopupContainer />
                {isMobile && (<BottomMenu />)}
                {children}
            </MenusContext.Provider>
        </Box>
    );
} 