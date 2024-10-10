import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { HeaderWrapper } from '../Header/styles';
import MobileSearchButton from '../MobileSearchButton/MobileSearchButton';
import { IconButton, LogoWrapper, MobileHeaderContainer, SearchWrapper } from './styles';

const MobileHeader: FC = () => {
    return (
        <HeaderWrapper>
            <MobileHeaderContainer >
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
            </MobileHeaderContainer>
        </HeaderWrapper>
    );
}

export default MobileHeader;