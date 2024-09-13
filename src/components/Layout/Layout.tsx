import { useGetMenusQuery, useGetProductQuery } from '@/store/rtk-queries/wpCustomApi';
import { LangParamType } from '@/types/services/wpCustomApi';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react';

export const MenusContext = createContext<any>(undefined);
const currency = 'USD';

export default function Layout({ children }: { children: React.ReactNode })
{
    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};

    const { data: menus, error, isLoading } = useGetMenusQuery(langParam);
    const { data: products, error: productError, isError } = useGetProductQuery(langParam);

    // useEffect(() =>
    // {
    //     if (products)
    //     {
    //         console.log(products);
    //     }
    // }, [products])

    useEffect(() =>
    {
        if (menus)
        {
            console.log(menus);
        }
    }, [menus])

    return (
        <Box>
            <MenusContext.Provider value={menus}>
                {children}
            </MenusContext.Provider>
        </Box>
    );
} 