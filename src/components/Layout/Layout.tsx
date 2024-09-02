import { useGetMenusQuery } from '@/store/rtk-queries/wpCustomApi';
import Box from '@mui/material/Box';
import { createContext } from 'react';

// When someone will be adding Menus component, it's important to change it to zod and add in types
interface MenuItemType
{
    id: number,
    name: string,
    url: string,
    description: string
    link: string
    slug: string
}

export const MenusContext = createContext<MenuItemType[] | undefined>(undefined);

export default function Layout({ children }: { children: React.ReactNode })
{
    const { data: menus, error, isLoading } = useGetMenusQuery({});
    // lang
    return (
        <Box>
            <MenusContext.Provider value={menus}>
                {children}
            </MenusContext.Provider>
        </Box>
    );
} 