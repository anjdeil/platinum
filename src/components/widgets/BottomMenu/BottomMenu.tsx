import IconButton from '@/components/global/buttons/IconButton/IconButton';
import AccountIcon from '@/components/global/icons/AccountIcon/AccountIcon';
import BurgerIcon from '@/components/global/icons/BurgerIcon/BurgerIcon';
import BurgerIconActive from '@/components/global/icons/BurgerIconActive/BurgerIconActive';
import CartIcon from '@/components/global/icons/CartIcon/CartIcon';
import CatalogIcon from '@/components/global/icons/CatalogIcon/CatalogIcon';
import HeartIcon from '@/components/global/icons/HeartIcon/HeartIcon';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { useTheme } from '@emotion/react';
import { BottomMenuNav, BottomMenuWrapper } from './styles';
import { useEffect, useState } from 'react';

const BottomMenu = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { cartItems } = useAppSelector(state => state.cartSlice);
  const popup = useAppSelector(state => state.popup);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  return (
    <BottomMenuWrapper>
      <BottomMenuNav aria-label="Bottom navigation">
        <IconButton
          onClick={() => dispatch(popupToggle('hamburger-menu'))}
          color={theme.colors.primary}
          IconComponent={
            popup === 'hamburger-menu' ? BurgerIconActive : BurgerIcon
          }
        />
        <IconButton
          onClick={() => dispatch(popupToggle('mobile-categories'))}
          color={
            popup === 'mobile-categories'
              ? theme.colors.active
              : theme.colors.primary
          }
          IconComponent={CatalogIcon}
        />
        <IconButton
          href="/my-account/wishlist"
          color={theme.colors.primary}
          IconComponent={HeartIcon}
        />
        <IconButton
          href="/cart"
          color={theme.colors.primary}
          count={cartCount}
          IconComponent={CartIcon}
        />
        <IconButton
          href="/my-account"
          color={theme.colors.primary}
          IconComponent={AccountIcon}
        />
      </BottomMenuNav>
    </BottomMenuWrapper>
  );
};

export default BottomMenu;
