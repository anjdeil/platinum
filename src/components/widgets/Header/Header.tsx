import IconButton from '@/components/global/buttons/IconButton/IconButton';
import AccountIcon from '@/components/global/icons/AccountIcon/AccountIcon';
import CartIcon from '@/components/global/icons/CartIcon/CartIcon';
import FindIcon from '@/components/global/icons/FindIcon/FindIcon';
import HeartIcon from '@/components/global/icons/HeartIcon/HeartIcon';
import SearchBar from '@/components/global/SearchBar/SearchBar';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { fetchUser } from '@/utils/auth/authService';
import React, { useEffect, useState } from 'react';
import Nav from '../../menus/Nav/Nav';
import {
  CategoriesButton,
  HeaderContainer,
  HeaderContent,
  HeaderIcons,
  HeaderWrapper,
  MenuWrapper,
} from './styles';
import { useTranslations } from 'next-intl';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [displayedSearchBar, setDisplayedSearchBar] = useState(false);
  const { cartItems } = useAppSelector(state => state.cartSlice);
  const [cartCount, setCartCount] = useState(0);
  const t = useTranslations('HomePage');

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    fetchUser(dispatch);
  }, [dispatch]);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {!displayedSearchBar ? (
          <MenuWrapper>
            <CategoriesButton
              onClick={() => dispatch(popupToggle('categories-menu'))}
            >
              {t('allShop')}
            </CategoriesButton>
            <Nav
              menuId={344}
              skeleton={{
                elements: 3,
                width: '80px',
                height: '24px',
                gap: '48px',
              }}
              texttransform="uppercase"
              justify="space-between"
            />
          </MenuWrapper>
        ) : (
          <SearchBar onClose={() => setDisplayedSearchBar(false)} />
        )}
        <HeaderContent>
          <HeaderIcons>
            {!displayedSearchBar && (
              <IconButton
                onClick={() => setDisplayedSearchBar(true)}
                IconComponent={FindIcon}
              />
            )}
            <IconButton href="/my-account" IconComponent={AccountIcon} />
            <IconButton href="/my-account/wishlist" IconComponent={HeartIcon} />
            <IconButton
              onClick={() => dispatch(popupToggle('mini-cart'))}
              count={cartCount}
              IconComponent={CartIcon}
            />
          </HeaderIcons>
        </HeaderContent>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
