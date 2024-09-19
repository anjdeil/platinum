import AccountButton from "@/components/Common/Buttons/AccountButton/AccountButton";
import BurgerButton from "@/components/Common/Buttons/BurgerButton/BurgerButton";
import CartButton from "@/components/Common/Buttons/CartButton/CartButton";
import CatalogButton from "@/components/Common/Buttons/CatalogButton/CatalogButton";
import HeartButton from "@/components/Common/Buttons/HeartButton/HeartButton";
import Link from "next/link";
import { useTheme } from "styled-components";
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