import BurgerButton from '@/components/Common/Buttons/BurgerButton/BurgerButton';
import CurrencySelect from '@/components/Common/Selects/CurrencySelect/CurrencySelect';
import LanguageSelect from '@/components/Common/Selects/LanguageSelect/LanguageSelect';
import { Container, LogoLink, LogoLinkImage, StyledButton } from '@/styles/components';
import { useTheme } from '@emotion/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import Nav from "../Nav/Nav";
import { BurgerButtonWrapper, ButtonWrapper, NavWrapper, SelectsWrapper, Stack } from './styles';

const TopBar: React.FC = () =>
{
    const theme = useTheme();
    const t = useTranslations('TopBar');

    return (
        <Container>
            <Stack>
                <LogoLink href="/" width={44} height={44} desktopwidth={92} desktopheight={92}>
                    <LogoLinkImage src="/assets/icons/logo.svg" alt="Logo" width={92} height={92} />
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
                    <BurgerButton />
                </BurgerButtonWrapper>
                <ButtonWrapper>
                    <StyledButton minWidthTablet="104px" minWidthDesktop="200px">{t("CallUs")}</StyledButton>
                </ButtonWrapper>
            </Stack>
        </Container>
    )
}

export default TopBar;