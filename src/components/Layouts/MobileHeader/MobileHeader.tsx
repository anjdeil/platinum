import { LogoLinkImage } from '@/styles/components';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import MobileSearchButton from '../MobileSearchButton/MobileSearchButton';
import { IconButton, LogoLink, MobileHeaderContainer, MobileHeaderWrapper, SearchWrapper } from './styles';

const MobileHeader: FC = () => {
    return (
        <MobileHeaderWrapper>
            <MobileHeaderContainer>
                <LogoLink href={'/'}>
                    <LogoLinkImage src="/assets/icons/logo_white.svg" alt="Logo" width={54} height={48}/>
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
        </MobileHeaderWrapper>
    );
}

export default MobileHeader;