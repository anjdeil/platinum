import { useGetMenusQuery } from '@/store/rtk-queries/wpCustomApi';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import PopupContainer from '../Popups/PopupContainer/PopupContainer';

// When someone will be adding Menus component, it's important to change it to zod and add in types
interface MenuItemType {
    id: number,
    name: string,
    url: string,
    description: string
    link: string
    slug: string
}

export const MenusContext = createContext<MenuItemType[] | undefined>(undefined);
const currency = 'USD';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { locale } = useRouter();
    const { data: menus, error, isLoading } = useGetMenusQuery({ lang: locale });

    return (
        <div>
            <MenusContext.Provider value={menus}>
                <PopupContainer />
                {children}
            </MenusContext.Provider>
        </div>
    );
} 