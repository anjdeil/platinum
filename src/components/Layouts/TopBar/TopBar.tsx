import IconButton from '@/components/Common/Buttons/IconButton/IconButton';
import BurgerIcon from '@/components/Common/Icons/BurgerIcon/BurgerIcon';
import BurgerIconActive from '@/components/Common/Icons/BurgerIconActive/BurgerIconActive';
import CurrencySelect from '@/components/Common/Selects/CurrencySelect/CurrencySelect';
import LanguageSelect from '@/components/Common/Selects/LanguageSelect/LanguageSelect';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { Container, LogoLink, LogoLinkImage, StyledButton } from '@/styles/components';
import { useTheme } from '@emotion/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import Nav from "../Nav/Nav";
import { BurgerButtonWrapper, ButtonWrapper, NavWrapper, SelectsWrapper, Stack } from './styles';

const TopBar: React.FC = () =>
{   const dispatch = useAppDispatch();
    const theme = useTheme();
    const popup = useAppSelector(state => state.Popup);
    const t = useTranslations('TopBar');

    return (
        <Container>
            <Stack>
                <LogoLink href="/" width={44} height={44} desktopwidth={92} desktopheight={92} >
                    <LogoLinkImage src="/assets/images/logo.png" alt="Logo" fill priority />
                </LogoLink>
                <NavWrapper>
                    <Nav
                        menuId={335}
                        skeleton={
                            {
                                elements: 4,
                                width: "90px",
                                height: "22px",
                                gap: '40px'
                            }
                        }
                        justify='space-between'
                        color={theme.colors.black}
                    />
                </NavWrapper>
                <SelectsWrapper>
                     <LanguageSelect />
                     <CurrencySelect />
                </SelectsWrapper>
                <BurgerButtonWrapper>
                    <IconButton onClick={() => dispatch(popupToggle('hamburger-menu'))} color={ theme.colors.primary } IconComponent={popup === 'hamburger-menu' ? BurgerIconActive : BurgerIcon} />
                </BurgerButtonWrapper>
                <ButtonWrapper>
                    <StyledButton minWidthTablet="104px" minWidthDesktop="200px">{t("CallUs")}</StyledButton>
                </ButtonWrapper>
            </Stack>
        </Container>
    )
}

export default TopBar;