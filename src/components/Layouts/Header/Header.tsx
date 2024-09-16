import HeaderIconButtons from '@/components/Common/Buttons/HeaderIconButtons';
import React from 'react';
import styled from 'styled-components';
import Nav from '../Navigation/Nav';
import SearchBar from '../SearchBar';
import { HeaderWrapper } from './styles';
import theme from '@/styles/theme';

const Header: React.FC = () =>
{
    // theme.colors.primary
    return (
        <HeaderWrapper backgroundColor={theme.colors.primary}>
            asd
            {/* <HeaderContainer className='container'>
                <HeaderNav>
                    <Nav
                        menuId={344}
                        skeleton={{
                            elements: 4,
                            width: "90px",
                            height: "40px",
                            gap: '40px'
                        }}
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
            </HeaderContainer> */}
        </HeaderWrapper>
    );
}

export default Header;