import { useGetMenusQuery, useGetProductsQuery } from '@/store/rtk-queries/wpCustomApi';
import { WpMenuResponseType } from '@/types/layouts/menus';
import { LangParamType } from '@/types/services/wpCustomApi';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

export const MenusContext = createContext<WpMenuResponseType[] | []>([]);
const currency = 'USD';

export default function Layout({ children }: { children: React.ReactNode })
{
    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};
    const [menus, setMenus] = useState<WpMenuResponseType[] | []>([]);

    const { data: menusResp, error, isLoading } = useGetMenusQuery(langParam);
    const { data: products, error: productError, isError } = useGetProductsQuery(langParam);

    useEffect(() =>
    {
        if (menusResp && menusResp.data && menusResp.data.items)
        {
            setMenus(menusResp.data.items);
        }
    }, [menusResp])

    return (
        <div className={montserrat.className}>
            <MenusContext.Provider value={menus}>
                {!isMobile && <TopBar />}
                {!isMobile ? <Header /> : <MobileHeader />}
                <PopupContainer />
                {isMobile && (<BottomMenu />)}
                {children}
                <Footer/>
            </MenusContext.Provider>
        </div>
    );
} 