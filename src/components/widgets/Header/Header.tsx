import HeaderIconButtons from '@/components/global/buttons/HeaderIconButtons/HeaderIconButtons';
import React from 'react';
import Nav from '../../menus/Nav/Nav';
import SearchBar from '../../global/SearchBar/SearchBar';
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
                        justify='space-between'
                    />
                </HeaderNav>
                <HeaderContent>
                    <HeaderSearch>
                        <SearchBar />
                    </HeaderSearch>
                    <HeaderIcons>
                        <HeaderIconButtons />
                    </HeaderIcons>
                </HeaderContent>
            </HeaderContainer>
        </HeaderWrapper>
    );
}

export default Header;