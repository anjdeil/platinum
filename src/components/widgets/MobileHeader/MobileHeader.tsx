import MobileSearchButton from '@/components/global/buttons/MobileSearchButton/MobileSearchButton';
import { LogoLink, LogoLinkImage } from '@/styles/components';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { IconButton, MobileHeaderContainer, MobileHeaderWrapper, SearchWrapper } from './styles';

const MobileHeader: FC = () =>
{    
    return (
        <MobileHeaderWrapper>
            <MobileHeaderContainer>
                <LogoLink href={'/'} width={54} height={48}>
                    <LogoLinkImage src="/assets/icons/logo_white.svg" alt="Logo" fill />
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