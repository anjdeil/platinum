import IconButton from "@/components/Common/Buttons/IconButton/IconButton";
import AccountIcon from "@/components/Common/Icons/AccountIcon/AccountIcon";
import BurgerIcon from "@/components/Common/Icons/BurgerIcon/BurgerIcon";
import BurgerIconActive from "@/components/Common/Icons/BurgerIconActive/BurgerIconActive";
import CartIcon from "@/components/Common/Icons/CartIcon/CartIcon";
import CatalogIcon from "@/components/Common/Icons/CatalogIcon/CatalogIcon";
import HeartIcon from "@/components/Common/Icons/HeartIcon/HeartIcon";
import { useAppDispatch, useAppSelector } from "@/store";
import { popupToggle } from "@/store/slices/PopupSlice";
import { useTheme } from "@emotion/react";
import { BottomMenuNav, BottomMenuWrapper } from "./styles";


const BottomMenu = () =>
{
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const popup = useAppSelector(state => state.Popup);

    return (
        <BottomMenuWrapper>
            <BottomMenuNav aria-label="Bottom navigation">
                <IconButton onClick={() => dispatch(popupToggle('hamburger-menu'))} color={ theme.colors.primary } IconComponent={popup === 'hamburger-menu' ? BurgerIconActive : BurgerIcon} />
                <IconButton onClick={() => dispatch(popupToggle('mobile-categories'))} color={popup === 'mobile-categories' ? theme.colors.active : theme.colors.primary } IconComponent={CatalogIcon} />
                <IconButton count={2} color={ theme.colors.primary} IconComponent={HeartIcon} />
                <IconButton href="/cart" color={ theme.colors.primary} count={3} IconComponent={CartIcon} />
                <IconButton href='/my-account' color={ theme.colors.primary} IconComponent={AccountIcon} />
            </BottomMenuNav>
        </BottomMenuWrapper>
    )
}

export default BottomMenu;