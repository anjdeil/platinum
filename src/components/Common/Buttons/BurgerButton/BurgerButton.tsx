import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { StyledIconButton } from '@/styles/components';
import Image from 'next/image';

export default function BurgerButton() {
  const dispatch = useAppDispatch();
  const popup = useAppSelector(state => state.popup);

  return (
    <StyledIconButton
        onClick={() => dispatch(popupToggle('hamburger-menu'))}
        aria-label="Open hamburger">
        <Image
            src={`/assets/icons/burger${popup === 'hamburger-menu' ? '-active' : ''}.svg`}
            alt={'Menu'}
            width={24}
            height={24}
            unoptimized={true}
        />
    </StyledIconButton>
  );
}
