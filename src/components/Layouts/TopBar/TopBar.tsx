import BurgerButton from '@/components/Common/Buttons/BurgerButton/BurgerButton';
import CurrencySelect from '@/components/Common/Selects/CurrencySelect/CurrencySelect';
import LanguageSelect from '@/components/Common/Selects/LanguageSelect/LanguageSelect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Nav from "../Navigation/Nav";

const Stack = styled.div`
  height: 44px;
  margin: 10px auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  align-items: center;

  @media ${({ theme }) => theme.media.large} {
    height: 92px;
  }
`;

const LogoLink = styled(Link)`
  grid-column: 1 / span 1;
  display: flex;
`;

const LogoLinkImage = styled(Image)`
  width: 44px;
  height: 44px;  

  @media ${({ theme }) => theme.media.large} {
    width: 92px;
    height: 92px;
  }
`;

const NavWrapper = styled.div`  
  display: none;  

  @media ${({ theme }) => theme.media.large} {
    grid-column: span 7;
    display: flex;
    gap: 79px;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const SelectsWrapper = styled.div`  
  display: none;  

  @media ${({ theme }) => theme.media.large} {
    grid-column: span 2;
    display: flex;
    gap: 20px;
  }

  @media ${({ theme }) => theme.media.xl} {
    gap: 52px;
  }
`;

const StyledButton = styled.button`
  height: 42px;
  grid-column: -3 / span 2;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  text-transform: none;
  border: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.background.hover};
  }

  @media ${({ theme }) => theme.media.large} {
    height: 56px;
    font-size: 16px;
    line-height: 24px;
  }
`;

const BurgerButtonWrapper = styled.div`
  grid-column: -4 / -3;
  display: flex;

  @media ${({ theme }) => theme.media.large} {
    display: none;
  }
`;

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
                                height: "40px",
                                gap: '40px'
                            }
                        }
                        topbar={true}
                    />
                </NavWrapper>
                <SelectsWrapper>
                     <LanguageSelect />
                     <CurrencySelect />
                </SelectsWrapper>
                <BurgerButtonWrapper>
                    <BurgerButton />
                </BurgerButtonWrapper>               
                <StyledButton>Call us</StyledButton>
            </Stack>
        </div>
    )
}

export default TopBar;