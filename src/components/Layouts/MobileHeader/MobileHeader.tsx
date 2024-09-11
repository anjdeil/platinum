import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';
import { MobileSearchButton } from '../SearchBar';

const HeaderWrapper = styled.div`
    background: radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%);
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: 60px;
`;

const LogoWrapper = styled.div`
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;

    & a {
        width: 100%;
        display: flex;
        align-items: center;
    }
`;

const SearchWrapper = styled.div`
    flex-grow: 1;
`;

const IconButton = styled.div`
    display: flex;
    padding: 0;

    & a {
        display: flex;
    }
`;

const MobileHeader: FC = () => {
    return (
        <HeaderWrapper>
            <HeaderContainer className='container'>
                <LogoWrapper>
                    <Link href={'/'} passHref>
                        <Image src="/assets/icons/logo_white.svg" alt="Logo" width={54} height={48} unoptimized={true} />
                    </Link>
                </LogoWrapper>
                <SearchWrapper>
                    <MobileSearchButton />
                </SearchWrapper>
                <IconButton>
                    <Link href={'tel:+4800000000'}>
                        <Image
                            src={'/assets/icons/phone.svg'}
                            alt={'Phone icon'}
                            width={24}
                            height={24}
                        />
                    </Link>
                </IconButton>
            </HeaderContainer>
        </HeaderWrapper>
    );
}

export default MobileHeader;