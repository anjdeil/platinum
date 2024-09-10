import AccountButton from "@/components/AccountButton/AccountButton";
import BurgerButton from "@/components/BurgerButton/BurgerButton";
import CartButton from "@/components/CartButton/CartButton";
import CatalogButton from "@/components/CatalogButton/CatalogButton";
import HeartButton from "@/components/HeartButton/HeartButton";
import Link from "next/link";
import { useTheme } from "styled-components";
import styles from "./styles.module.scss";

const BottomMenu = () => {
    const theme = useTheme();
    return (
        <div className={styles['bottom-menu']}>
            <nav className={styles['bottom-menu__nav']} aria-label="Bottom navigation">
                <BurgerButton />
                <CatalogButton />
                <HeartButton color={theme.colors.primary} count={3} />
                <Link
                    href={"/cart"}
                    className={`
                        ${styles['bottom-menu__button']}
                    `}
                    aria-label="Open your cart"
                >
                    <CartButton color={theme.colors.primary} count={2}  />
                </Link>
                <Link
                    href={"/my-account"}
                    className={`
                        ${styles['bottom-menu__button']}
                    `}
                    aria-label="Open your account"
                >
                    <AccountButton color={theme.colors.primary} />
                </Link>
            </nav>
        </div>
    )
}

export default BottomMenu;