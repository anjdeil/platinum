import BurgerButton from '@/components/Common/Buttons/BurgerButton/BurgerButton';
import CurrencySelect from '@/components/Common/Selects/CurrencySelect/CurrencySelect';
import LanguageSelect from '@/components/Common/Selects/LanguageSelect/LanguageSelect';
import { StyledButton } from '@/styles/components';
import React from 'react';
import Nav from "../Nav/Nav";
import { BurgerButtonWrapper, ButtonWrapper, LogoLink, LogoLinkImage, NavWrapper, SelectsWrapper, Stack } from './styles';

const TopBar: React.FC = () =>
{
    return (
        <div className="container">
            <Stack>
                <LogoLink href="/" passHref>
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
                        color={({ theme }) => theme.colors.black}
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
                  <StyledButton height='42px'>Call us</StyledButton>
                </ButtonWrapper>
            </Stack>
        </div>
    )
}

export default TopBar;