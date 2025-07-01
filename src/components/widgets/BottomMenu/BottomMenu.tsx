import IconButton from '@/components/global/buttons/IconButton/IconButton';
import AccountIcon from '@/components/global/icons/AccountIcon/AccountIcon';
import BurgerIcon from '@/components/global/icons/BurgerIcon/BurgerIcon';
import CartIcon from '@/components/global/icons/CartIcon/CartIcon';
import CatalogIcon from '@/components/global/icons/CatalogIcon/CatalogIcon';
import CatalogIconInfo from '@/components/global/icons/CatalogIconInfo/CatalogIconInfo';
import HeartIcon from '@/components/global/icons/HeartIcon/HeartIcon';
import { useWishlist } from '@/hooks/useWishlist';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { useTheme } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BottomMenuNav, BottomMenuWrapper } from './styles';

const BottomMenu = () => {
  const { locale } = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { cartItems } = useAppSelector(state => state.cartSlice);
  const { popupType } = useAppSelector(state => state.popup);
  const [cartCount, setCartCount] = useState(0);
  const { wishlist } = useWishlist();

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  return (
    <BottomMenuWrapper>
      <BottomMenuNav aria-label="Bottom navigation">
        <IconButton
          onClick={() =>
            dispatch(popupToggle({ popupType: 'mobile-categories' }))
          }
          color={
            popupType === 'mobile-categories'
              ? theme.colors.active
              : theme.colors.primary
          }
          IconComponent={BurgerIcon}
        />
        <IconButton
          href={`/${locale}/my-account/wishlist`}
          color={theme.colors.primary}
          count={wishlist.length}
          IconComponent={HeartIcon}
        />
        <IconButton
          href="/cart"
          color={theme.colors.primary}
          count={cartCount}
          IconComponent={CartIcon}
        />
        <IconButton
          href={`/${locale}/my-account`}
          color={theme.colors.primary}
          IconComponent={AccountIcon}
        />
        <IconButton
          onClick={() => dispatch(popupToggle({ popupType: 'hamburger-menu' }))}
          color={
            popupType === 'hamburger-menu'
              ? theme.colors.active
              : theme.colors.primary
          }
          IconComponent={locale === 'pl' ? CatalogIcon : CatalogIconInfo}
        />
      </BottomMenuNav>
    </BottomMenuWrapper>
  );
};

export default BottomMenu;
