import React, { useState } from 'react';
import Nav from '../../menus/Nav/Nav';
import { HeaderContainer, HeaderContent, HeaderIcons, HeaderNav, HeaderWrapper } from './styles';
import AccountIcon from '@/components/global/icons/AccountIcon/AccountIcon';
import CartIcon from '@/components/global/icons/CartIcon/CartIcon';
import HeartIcon from '@/components/global/icons/HeartIcon/HeartIcon';
import IconButton from '@/components/global/buttons/IconButton/IconButton';
import FindIcon from '@/components/global/icons/FindIcon/FindIcon';
import SearchBar from '@/components/global/SearchBar/SearchBar';

const Header: React.FC = () => {

    const [displayedSearchBar, setDisplayedSearchBar] = useState(false);

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
                        <IconButton count={3} IconComponent={CartIcon} />
                        <IconButton count={2} IconComponent={HeartIcon} />
                    </HeaderIcons>
                </HeaderContent>
            </HeaderContainer>
        </HeaderWrapper>
    );
}

export default Header;