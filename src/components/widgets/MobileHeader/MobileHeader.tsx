import { LogoLink, LogoLinkImage } from '@/styles/components';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { IconButton, MobileHeaderContainer, MobileHeaderWrapper, SearchWrapper } from './styles';
import MobileSearchButton from '@/components/global/buttons/MobileSearchButton/MobileSearchButton';

const MobileHeader: FC = () =>
{
    return (
        <MobileHeaderWrapper>
            <MobileHeaderContainer>
                <LogoLink href={'/'} width={54} height={48}>
                    <LogoLinkImage src="/assets/images/logo_white.png" alt="Logo" fill />
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