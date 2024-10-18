import IconButton from "@/components/Common/Buttons/IconButton/IconButton";
import { useAppDispatch, useAppSelector } from "@/store";
import { popupToggle } from "@/store/slices/PopupSlice";
import { useTheme } from "@emotion/react";
import { BottomMenuNav, BottomMenuWrapper } from "./styles";
import HeartIcon from "@/components/global/icons/HeartIcon/HeartIcon";
import CartIcon from "@/components/global/icons/CartIcon/CartIcon";
import AccountIcon from "@/components/global/icons/AccountIcon/AccountIcon";
import BurgerIconActive from "@/components/global/icons/BurgerIconActive/BurgerIconActive";
import CatalogIcon from "@/components/global/icons/CatalogIcon/CatalogIcon";
import BurgerIcon from "@/components/global/icons/BurgerIcon/BurgerIcon";


const BottomMenu = () =>
{
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const popup = useAppSelector(state => state.Popup);

    return (
        <BottomMenuWrapper>
            <BottomMenuNav aria-label="Bottom navigation">
                <IconButton onClick={() => dispatch(popupToggle('hamburger-menu'))} color={theme.colors.primary} IconComponent={popup === 'hamburger-menu' ? BurgerIconActive : BurgerIcon} />
                <IconButton onClick={() => dispatch(popupToggle('mobile-categories'))} color={popup === 'mobile-categories' ? theme.colors.active : theme.colors.primary} IconComponent={CatalogIcon} />
                <IconButton count={2} color={theme.colors.primary} IconComponent={HeartIcon} />
                <IconButton href="/cart" color={theme.colors.primary} count={3} IconComponent={CartIcon} />
                <IconButton href='/my-account' color={theme.colors.primary} IconComponent={AccountIcon} />
            </BottomMenuNav>
        </BottomMenuWrapper>
    )
}

export default BottomMenu;