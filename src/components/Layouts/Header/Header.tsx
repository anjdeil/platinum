import HeaderIconButtons from '@/components/Common/Buttons/HeaderIconButtons';
import React from 'react';
import styled from 'styled-components';
import Nav from '../Navigation/Nav';
import SearchBar from '../SearchBar';

const HeaderWrapper = styled.div`
    background: radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%);
`;

const HeaderContainer = styled.div`
    height: 72px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    align-items: center;

    @media ${({ theme }) => theme.media.large} {
        height: 77px;
    }
`;

const HeaderNav = styled.div`
    grid-column: span 6;
`;

const HeaderContent = styled.div`
    grid-column: 8 / 13;
    display: flex;
    gap: 24px;
    justify-content: space-between;
    align-items: center;
`;

const HeaderSearch = styled.div`
    width: 133px;

    @media ${({ theme }) => theme.media.large} {
         width: 195px;
    }
`;

const HeaderIcons = styled.div`
    width: 124px;

    @media ${({ theme }) => theme.media.large} {
        width: 210px;
    }
`;

const Header: React.FC = () =>
{
    return (
        <HeaderWrapper>
            <HeaderContainer className='container'>
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
            </HeaderContainer>
        </HeaderWrapper>
    );
}

export default Header;