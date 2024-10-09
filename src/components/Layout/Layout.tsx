import { useResponsive } from '@/hooks/useResponsive';
import { useGetMenusQuery, useGetProductsQuery, useGetThemeOptionsQuery } from '@/store/rtk-queries/wpCustomApi';
import { WpMenuResponseType } from '@/types/layouts/Menus';
import { LangParamType } from '@/types/services/wpCustomApi';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import TopBar from '../Layouts/TopBar/TopBar';
import Header from '../Layouts/Header/Header';
import MobileHeader from '../Layouts/MobileHeader/MobileHeader';
import { PopupContainer } from '../Popups/MobilePopup/styles';
import BottomMenu from '../Layouts/BottomMenu';
import { Footer } from '../Layouts/Footer';
import { setThemeOptions } from '@/store/slices/themeOptionsSlice';
import { useDispatch } from 'react-redux';

export const MenusContext = createContext<WpMenuResponseType[] | []>([]);
const currency = 'USD';

export default function Layout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const { isMobile } = useResponsive();
    const { locale } = useRouter();
    const langParam: LangParamType  | object  = locale ? { lang: locale } : {};
    const langParamStr = locale ? locale : '';
    const [menus, setMenus] = useState<WpMenuResponseType[] | []>([]);

    const { data: menusResp, error, isLoading } = useGetMenusQuery(langParam);
    const { data: themeOptions, error: themeOptionsError, } = useGetThemeOptionsQuery();
    const { data: products, error: productError, isError } = useGetProductsQuery(langParam);

    useEffect(() => {
        if (menusResp && menusResp.data && menusResp.data.items) {
            setMenus(menusResp.data.items);
        }
    }, [menusResp])

    useEffect(() => {
        if (themeOptions && themeOptions.data) {
          dispatch(setThemeOptions({ data: themeOptions, language: langParamStr }));
        }
      }, [themeOptions, locale, dispatch]);

      

    return (
        <Box>
            <MenusContext.Provider value={menus}>
                {!isMobile && <TopBar />}
                {!isMobile ? <Header /> : <MobileHeader />}
                <PopupContainer /> 
                {isMobile && (<BottomMenu />)}
                {children}
                <Footer />
            </MenusContext.Provider>
        </Box>
    );
} 