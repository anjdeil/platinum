import { useResponsive } from '@/hooks/useResponsive'
import {
  useGetMenusQuery,
  useGetThemeOptionsQuery,
} from '@/store/rtk-queries/wpCustomApi'
import { setThemeOptions } from '@/store/slices/themeOptionsSlice'
import { WpMenuResponseType } from '@/types/menus/WpMenus'
import { LangParamType } from '@/types/services/wpCustomApi'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PopupContainer from '../global/popups/PopupContainer/PopupContainer'
import BottomMenu from '../widgets/BottomMenu'
import { CategoriesMenu } from '../widgets/CategoriesMenu'
import { Footer } from '../widgets/Footer'
import Header from '../widgets/Header/Header'
import MobileHeader from '../widgets/MobileHeader/MobileHeader'
import TopBar from '../widgets/TopBar/TopBar'

export const MenusContext = createContext<WpMenuResponseType[] | []>([])
const currency = 'USD'

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const { isMobile } = useResponsive()
  const { locale } = useRouter()
  const langParam: LangParamType | object = locale ? { lang: locale } : {}
  const langParamStr = locale ? locale : ''
  const [menus, setMenus] = useState<WpMenuResponseType[] | []>([])

  const { data: menusResp, error, isLoading } = useGetMenusQuery(langParam)
  const { data: themeOptions, error: themeOptionsError } = useGetThemeOptionsQuery()
  /*     const { data: products, error: productError, isError } = useGetProductsQuery(langParam); */

  useEffect(() => {
    if (menusResp && menusResp.data && menusResp.data.items) {
      setMenus(menusResp.data.items)
    }
  }, [menusResp])

  useEffect(() => {
    if (themeOptions && themeOptions.data) {
      dispatch(setThemeOptions({ data: themeOptions, language: langParamStr }))
    }
  }, [themeOptions, locale, dispatch])

  return (
    <Box>
      <MenusContext.Provider value={menus}>
        {!isMobile && <TopBar />}
        {!isMobile ? <Header /> : <MobileHeader />}
        <PopupContainer />
        {isMobile && <BottomMenu />}
        {children}
        <Footer />
        <CategoriesMenu />
      </MenusContext.Provider>
    </Box>
  )
}
