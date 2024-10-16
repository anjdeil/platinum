import { useResponsive } from '@/hooks/useResponsive';
import { useGetMenusQuery } from '@/store/rtk-queries/wpCustomApi';
import { MenuItemsType } from '@/types/services/customApi/Menu/MenuItemsType';
import { LangParamType } from '@/types/services/wpCustomApi';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import BottomMenu from '../Layouts/BottomMenu';
import { CategoriesMenu } from '../Layouts/CategoriesMenu';
import Header from '../Layouts/Header/Header';
import MobileHeader from '../Layouts/MobileHeader/MobileHeader';
import TopBar from '../Layouts/TopBar/TopBar';
import PopupContainer from '../Popups/PopupContainer/PopupContainer';

export const MenusContext = createContext<MenuItemsType[] | undefined>(undefined);
 
export default function Layout({ children }: { children: React.ReactNode })
{
    const { isMobile } = useResponsive();
    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};

    const menuIds = [335, 344];

    const { data: menusData } = useGetMenusQuery({
        include: menuIds
    });

    const menus = menusData?.data ? menusData.data.items as MenuItemsType[] : [];
       
    return (
        <Box>
            <MenusContext.Provider value={menus}>
                {!isMobile && <TopBar />}
                {!isMobile ? <Header /> : <MobileHeader />}
                <PopupContainer />                
                {isMobile && (<BottomMenu />)}
                {children}
                <CategoriesMenu />
            </MenusContext.Provider>
        </Box>
    );
} 