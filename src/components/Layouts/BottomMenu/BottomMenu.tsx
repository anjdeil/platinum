import AccountButton from "@/components/AccountButton/AccountButton";
import BurgerButton from "@/components/BurgerButton/BurgerButton";
import CartButton from "@/components/CartButton/CartButton";
import CatalogButton from "@/components/CatalogButton/CatalogButton";
import HeartButton from "@/components/HeartButton/HeartButton";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";

const BottomMenu = () => {

    const dispatch = useAppDispatch();
    const popup = useAppSelector(state => state.Popup);
    // const { items: cartItems } = useAppSelector(state => state.Cart);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    // useEffect(() => {
    //     setCartItemsCount(cartItems.length);
    // }, [cartItems]);

    return (
        <div className={styles['bottom-menu']}>
            <nav className={styles['bottom-menu__nav']} aria-label="Bottom navigation">
                <BurgerButton />
                <CatalogButton />
                <HeartButton color="#113760" count={3} />
                <Link
                    href={"/cart"}
                    className={`
                        ${styles['bottom-menu__button']}
                        ${(popup === 'mobile-cart') && styles['bottom-menu__button_active']}
                    `}
                    aria-label="Open your cart"
                >
                    <CartButton color="#113760" count={2}  />
                </Link>
                <Link
                    href={"/my-account"}
                    className={`
                        ${styles['bottom-menu__button']}
                    `}
                    aria-label="Open your account"
                >
                    <AccountButton color="#113760" />
                </Link>
            </nav>
        </div>
    )
}

export default BottomMenu;