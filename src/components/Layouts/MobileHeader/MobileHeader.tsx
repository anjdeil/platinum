import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { HeaderWrapper } from '../Header/styles';
import MobileSearchButton from '../MobileSearchButton/MobileSearchButton';
import { IconButton, MobileHeaderContainer, SearchWrapper } from './styles';
import { LogoLink, LogoLinkImage } from '../TopBar/styles';

const MobileHeader: FC = () =>
{
    return (
        <HeaderWrapper>
            <MobileHeaderContainer>
                <LogoLink href={'/'}>
                    <LogoLinkImage
                        src="/assets/images/logo_white.png"
                        alt="Logo"
                        priority
                        width={44}
                        height={44}
                    />
                </LogoLink>
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