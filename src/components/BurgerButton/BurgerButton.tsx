import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import styles from './BurgerButton.module.scss';

export default function BurgerButton() {
  const dispatch = useAppDispatch();
  const popup = useAppSelector(state => state.Popup);

  return (
    <IconButton
        onClick={() => dispatch(popupToggle('hamburger-menu'))}
        className={styles['burger__button']}
        aria-label="Open hamburger">
        <Image
            src={`/assets/icons/burger${popup === 'hamburger-menu' ? '-active' : ''}.svg`}
            alt={'Menu'}
            width={24}
            height={24}
            unoptimized={true}
        />
    </IconButton>
  );
}
