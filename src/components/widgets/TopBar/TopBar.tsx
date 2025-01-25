import IconButton from '@/components/global/buttons/IconButton/IconButton';
import BurgerIcon from '@/components/global/icons/BurgerIcon/BurgerIcon';
import BurgerIconActive from '@/components/global/icons/BurgerIconActive/BurgerIconActive';
import CurrencySelect from '@/components/global/selects/CurrencySelect/CurrencySelect';
import LanguageSelect from '@/components/global/selects/LanguageSelect/LanguageSelect';
import Nav from '@/components/menus/Nav/Nav';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { LogoLink, LogoLinkImage, StyledButton } from '@/styles/components';
import { useTheme } from '@emotion/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  BurgerButtonWrapper,
  ButtonWrapper,
  NavWrapper,
  SelectsWrapper,
  Stack,
  TopBarWrapper,
} from './styles';

const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const popup = useAppSelector(state => state.popup);
  const t = useTranslations('TopBar');

  return (
    <TopBarWrapper>
      <Stack>
        <LogoLink
          href="/"
          width={44}
          height={44}
          desktopwidth={92}
          desktopheight={92}
        >
          <LogoLinkImage
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={92}
            height={92}
          />
        </LogoLink>
        <NavWrapper>
          <Nav
            menuId={335}
            skeleton={{
              elements: 4,
              width: '90px',
              height: '22px',
              gap: '20px',
            }}
            justify="space-between"
            color={theme.colors.black}
          />
        </NavWrapper>
        <SelectsWrapper>
          <LanguageSelect />
          <CurrencySelect />
        </SelectsWrapper>
        <BurgerButtonWrapper>
          <IconButton
            onClick={() => dispatch(popupToggle('hamburger-menu'))}
            color={theme.colors.primary}
            IconComponent={
              popup === 'hamburger-menu' ? BurgerIconActive : BurgerIcon
            }
          />
        </BurgerButtonWrapper>
        <ButtonWrapper href={'tel:+48883462736'}>
          <StyledButton
            secondary={true}
            minWidthTablet="104px"
            minWidthDesktop="200px"
          >
            {t('CallUs')}
          </StyledButton>
        </ButtonWrapper>
      </Stack>
    </TopBarWrapper>
  );
};

export default TopBar;
