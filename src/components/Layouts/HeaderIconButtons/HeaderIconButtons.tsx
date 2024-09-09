import AccountButton from "@/components/AccountButton/AccountButton";
import CartButton from "@/components/CartButton/CartButton";
import HeartButton from "@/components/HeartButton/HeartButton";
import Link from "next/link";
import "./styles.module.scss";
import styles from "./styles.module.scss";

const HeaderIconButtons = () => {   

    return (
        <div className={styles["header-icon-buttons"]}>
            <Link href={'/my-account'}>
                <AccountButton />
            </Link>
            <CartButton count={3} />
            <HeartButton count={2} />
            {/* {popup === 'mini-cart' && (<MiniCartPopup />)} */}
        </div>
    );
}

export default HeaderIconButtons;