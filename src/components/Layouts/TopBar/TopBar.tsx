import IconButton from '@/components/Common/Buttons/IconButton/IconButton';
import BurgerIcon from '@/components/Common/Icons/BurgerIcon/BurgerIcon';
import BurgerIconActive from '@/components/Common/Icons/BurgerIconActive/BurgerIconActive';
import CurrencySelect from '@/components/Common/Selects/CurrencySelect/CurrencySelect';
import LanguageSelect from '@/components/Common/Selects/LanguageSelect/LanguageSelect';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { Container, LogoLinkImage, StyledButton } from '@/styles/components';
import { useTheme } from '@emotion/react';
import React from 'react';
import Nav from "../Nav/Nav";
import { BurgerButtonWrapper, ButtonWrapper, LogoLink, NavWrapper, SelectsWrapper, Stack } from './styles';

const TopBar: React.FC = () =>
{   const dispatch = useAppDispatch();
    const theme = useTheme();
    const popup = useAppSelector(state => state.Popup);

    return (
        <Container>
            <Stack>
                <LogoLink href="/">
                    <LogoLinkImage src="/assets/icons/logo.svg" alt="Logo" width={44} height={44} desktopWidth={92} desktopHeight={92} />
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
                  <StyledButton>Call us</StyledButton>
                </ButtonWrapper>
            </Stack>
        </Container>
    )
}

export default TopBar;