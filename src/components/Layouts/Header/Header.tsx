import IconButton from '@/components/Common/Buttons/IconButton/IconButton';
import AccountIcon from '@/components/Common/Icons/AccountIcon/AccountIcon';
import CartIcon from '@/components/Common/Icons/CartIcon/CartIcon';
import HeartIcon from '@/components/Common/Icons/HeartIcon/HeartIcon';
import React from 'react';
import Nav from '../Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';
import { HeaderContainer, HeaderContent, HeaderIcons, HeaderNav, HeaderSearch, HeaderWrapper } from './styles';

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
                            width: "90px",
                            height: "24px",
                            gap: '40px'
                        }}
                        textTransform='uppercase'
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