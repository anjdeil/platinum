import AccountButton from "@/components/global/buttons/AccountButton/AccountButton";
import BurgerButton from "@/components/global/buttons/BurgerButton/BurgerButton";
import CartButton from "@/components/global/buttons/CartButton/CartButton";
import CatalogButton from "@/components/global/buttons/CatalogButton/CatalogButton";
import HeartButton from "@/components/global/buttons/HeartButton/HeartButton";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import { BottomMenuNav, BottomMenuWrapper } from "./styles";


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
                    <CartButton color={theme.colors.primary} count={2} />
                </Link>
                <Link href="/my-account" aria-label="Open your account">
                    <AccountButton color={theme.colors.primary} />
                </Link>
            </BottomMenuNav>
        </BottomMenuWrapper>
    )
}

export default BottomMenu;