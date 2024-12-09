import IconButton from '@/components/global/buttons/IconButton/IconButton';
import AccountIcon from '@/components/global/icons/AccountIcon/AccountIcon';
import CartIcon from '@/components/global/icons/CartIcon/CartIcon';
import FindIcon from '@/components/global/icons/FindIcon/FindIcon';
import HeartIcon from '@/components/global/icons/HeartIcon/HeartIcon';
import SearchBar from '@/components/global/SearchBar/SearchBar';
import { useAppSelector } from '@/store';
import React, { useEffect, useState } from 'react';
import Nav from '../../menus/Nav/Nav';
import { HeaderContainer, HeaderContent, HeaderIcons, HeaderNav, HeaderWrapper } from './styles';

const Header: React.FC = () => {

    const [displayedSearchBar, setDisplayedSearchBar] = useState(false);
    const { cartItems } = useAppSelector((state) => state.cartSlice);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(cartItems.length);
    }, [cartItems]);

    return (
        <HeaderWrapper>
            <HeaderContainer>
                {!displayedSearchBar ?
                    <HeaderNav>
                        <Nav
                            menuId={344}
                            skeleton={{
                                elements: 4,
                                width: "80px",
                                height: "24px",
                                gap: '24px'
                            }}
                            texttransform='uppercase'
                            justify='space-evenly'
                        />
                    </HeaderNav> :
                    <SearchBar onClose={() => setDisplayedSearchBar(false)} />
                }
                <HeaderContent>
                    <HeaderIcons>
                        {!displayedSearchBar &&
                            <IconButton onClick={() => setDisplayedSearchBar(true)} IconComponent={FindIcon} />
                        }
                        <IconButton href='/my-account' IconComponent={AccountIcon} />
                        <IconButton href='/cart' count={cartCount} IconComponent={CartIcon} />
                        <IconButton count={2} IconComponent={HeartIcon} />
                    </HeaderIcons>
                </HeaderContent>
            </HeaderContainer>
        </HeaderWrapper>
    );
}

export default Header;