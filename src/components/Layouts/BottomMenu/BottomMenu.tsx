import AccountButton from "@/components/Common/Buttons/AccountButton/AccountButton";
import BurgerButton from "@/components/Common/Buttons/BurgerButton/BurgerButton";
import CartButton from "@/components/Common/Buttons/CartButton/CartButton";
import CatalogButton from "@/components/Common/Buttons/CatalogButton/CatalogButton";
import HeartButton from "@/components/Common/Buttons/HeartButton/HeartButton";
import Link from "next/link";
import styled, { useTheme } from "styled-components";

const BottomMenuWrapper = styled.div`
  z-index: 2000;
  height: 60px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background.secondary};
`;

const BottomMenuNav = styled.nav`
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomMenuButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const BottomMenu = () =>
{
    const theme = useTheme();
    return (
        <BottomMenuWrapper>
            <BottomMenuNav aria-label="Bottom navigation">
                <BurgerButton />
                <CatalogButton />
                <HeartButton color={theme.colors.primary} count={3} />
                <Link href="/cart" aria-label="Open your cart">
                <BottomMenuButton>
                    <CartButton color={theme.colors.primary} count={2} />
                </BottomMenuButton>
                </Link>
                <Link href="/my-account" aria-label="Open your account">
                <BottomMenuButton>
                    <AccountButton color={theme.colors.primary} />
                </BottomMenuButton>
                </Link>
            </BottomMenuNav>
        </BottomMenuWrapper>
    )
}

export default BottomMenu;