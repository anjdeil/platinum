import { useResponsive } from '@/hooks/useResponsive';
import { useGetMenusQuery, useGetProductsQuery, useGetThemeOptionsQuery } from '@/store/rtk-queries/wpCustomApi';
import { WpMenuResponseType } from '@/types/menus/WpMenus';
import { LangParamType } from '@/types/services/wpCustomApi';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { CategoriesMenu } from '../widgets/CategoriesMenu';
import MobileHeader from '../widgets/MobileHeader/MobileHeader';
import { Header, PopupContainer } from '../global/popups/MobilePopup/styles';
import BottomMenu from '../widgets/BottomMenu';
import { Footer } from '../widgets/Footer';
import { setThemeOptions } from '@/store/slices/themeOptionsSlice';
import { useDispatch } from 'react-redux';
import TopBar from '../widgets/TopBar/TopBar';


export const MenusContext = createContext<WpMenuResponseType[] | []>([]);
const currency = 'USD';

export default function Layout({ children }: { children: React.ReactNode })
{
    const dispatch = useDispatch();
    const { isMobile } = useResponsive();
    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};
    const langParamStr = locale ? locale : '';
    const [menus, setMenus] = useState<WpMenuResponseType[] | []>([]);

    const { data: menusResp, error, isLoading } = useGetMenusQuery(langParam);
    const { data: themeOptions, error: themeOptionsError, } = useGetThemeOptionsQuery();
/*     const { data: products, error: productError, isError } = useGetProductsQuery(langParam); */

    useEffect(() =>
    {
        if (menusResp && menusResp.data && menusResp.data.items)
        {
            setMenus(menusResp.data.items);
        }
    }, [menusResp])

    useEffect(() =>
    {
        if (themeOptions && themeOptions.data)
        {
            dispatch(setThemeOptions({ data: themeOptions, language: langParamStr }));
        }
    }, [themeOptions, locale, dispatch]);

    return (
        <Box>
            <MenusContext.Provider value={menus}>
                {!isMobile && <TopBar />}
                {!isMobile ? <Header /> : <MobileHeader />}
                {isMobile && (<BottomMenu />)}
                {children}
                <Footer />
                <CategoriesMenu />
            </MenusContext.Provider >
        </Box >
    );
} 