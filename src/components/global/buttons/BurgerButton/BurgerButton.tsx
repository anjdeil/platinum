import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import Image from 'next/image';
import { StyledIconButton } from '../IconButton/styles';

export default function BurgerButton()
{
  const dispatch = useAppDispatch();
  const { popupType } = useAppSelector(state => state.popup);

  return (
    <StyledIconButton
      // onClick={() => dispatch(popupToggle('hamburger-menu'))}
      onClick={() => dispatch(popupToggle({ popupType: 'hamburger-menu' }))}
      aria-label="Open hamburger"
    >
      <Image
        src={`/assets/icons/burger${
          popupType === 'hamburger-menu' ? '-active' : ''
        }.svg`}
        alt={'Menu'}
        width={24}
        height={24}
      />
    </StyledIconButton>
  );
}
