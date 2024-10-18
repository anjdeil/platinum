import IconButton from '@/components/Common/Buttons/IconButton/IconButton';
import React from 'react';
import Nav from '../../menus/Nav/Nav';
import SearchBar from '../../global/SearchBar/SearchBar';
import { HeaderContainer, HeaderContent, HeaderIcons, HeaderNav, HeaderSearch, HeaderWrapper } from './styles';
import AccountIcon from '@/components/global/icons/AccountIcon/AccountIcon';
import CartIcon from '@/components/global/icons/CartIcon/CartIcon';
import HeartIcon from '@/components/global/icons/HeartIcon/HeartIcon';

const Header: React.FC = () =>
{
    return (
        <HeaderWrapper>
            <HeaderContainer>
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
                </HeaderNav>
                <HeaderContent>
                    <HeaderSearch>
                        <SearchBar />
                    </HeaderSearch>
                    <HeaderIcons>
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