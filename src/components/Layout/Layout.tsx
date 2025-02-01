import { useResponsive } from '@/hooks/useResponsive';
import {
  useGetCategoriesQuery,
  useGetMenusQuery,
  useGetThemeOptionsQuery,
} from '@/store/rtk-queries/wpCustomApi';
import { setCategories, setLoading } from '@/store/slices/categoriesSlice';
import { setThemeOptions } from '@/store/slices/themeOptionsSlice';
import { WpMenuResponseType } from '@/types/menus/WpMenus';
import { LangParamType } from '@/types/services/wpCustomApi';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import WhatsAppButton from '../global/buttons/WhatsAppButton/WhatsAppButton';
import PopupContainer from '../global/popups/PopupContainer/PopupContainer';
import CategoriesMenu from '../shop/categories/CategoriesMenu/CategoriesMenu';
import BottomMenu from '../widgets/BottomMenu';
import { Footer } from '../widgets/Footer';
import Header from '../widgets/Header/Header';
import MobileHeader from '../widgets/MobileHeader/MobileHeader';
import TopBar from '../widgets/TopBar/TopBar';
import { initializeCart } from '@/store/slices/cartSlice';
import { setCurrentLanguage } from '@/store/slices/languageSlice';

export const MenusContext = createContext<WpMenuResponseType[] | []>([]);

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { locale } = router;
  const langParam: LangParamType | object = locale ? { lang: locale } : {};
  const langParamStr = locale ? locale : '';
  const [menus, setMenus] = useState<WpMenuResponseType[] | []>([]);

  const { data: menusResp } = useGetMenusQuery(langParam);
  const { data: themeOptions } = useGetThemeOptionsQuery();
  const { data: categoriesResp, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery(langParam);

  useEffect(() => {
    if (locale) {
      dispatch(setCurrentLanguage({ name: locale }));
      dispatch(initializeCart());
    }
  }, []);

  useEffect(() => {
    if (menusResp && menusResp.data && menusResp.data.items) {
      setMenus(menusResp.data.items);
    }
  }, [menusResp]);

  useEffect(() => {
    if (themeOptions && themeOptions.data) {
      dispatch(setThemeOptions({ data: themeOptions, language: langParamStr }));
    }
  }, [themeOptions, locale, dispatch]);

  useEffect(() => {
    if (categoriesResp && categoriesResp.data) {
      dispatch(setCategories(categoriesResp.data.items));
    }
    dispatch(setLoading(isCategoriesLoading));
  }, [categoriesResp, isCategoriesLoading, dispatch]);

  return (
    <Box>
      <MenusContext.Provider value={menus}>
        {!isMobile && <TopBar />}
        {!isMobile ? <Header /> : <MobileHeader />}
        <PopupContainer />
        {isMobile && <BottomMenu />}
        {children}
        <Footer />
        <CategoriesMenu isMenuVisible={true} shop={false} />
        <WhatsAppButton />
      </MenusContext.Provider>
    </Box>
  );
}
