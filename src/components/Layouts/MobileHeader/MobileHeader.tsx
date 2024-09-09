import { IconButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { MobileSearchButton } from '../SearchBar';
import styles from './styles.module.scss';

const MobileHeader: FC = () => {
    return (
        <div className={styles.header__wrapper}>
            <div className={`${styles.header} container`}>
                <div className={styles.header__logo}>
                    <Link href={'/'} passHref>
                        <Image src="/assets/icons/logo_white.svg" alt="Logo" width={54} height={48} unoptimized={true} />
                    </Link>
                </div>
                <div className={styles.header__searchWrapper}>
                    <MobileSearchButton />
                </div>
                <div className={styles.header__iconButton}>
                    <IconButton
                        sx={{
                        padding: 0,
                    }}>
                        <Link href={'tel:+4800000000'}>
                            <Image
                                src={'/assets/icons/phone.svg'}
                                alt={'Phone icon'}
                                width={24}
                                height={24}
                            />
                        </Link>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default MobileHeader;