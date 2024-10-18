import AccountButton from "@/components/global/buttons/AccountButton/AccountButton";
import CartButton from "@/components/global/buttons/CartButton/CartButton";
import HeartButton from "@/components/global/buttons/HeartButton/HeartButton";
import { HeaderIconButtonsStyled, HeaderLinkButtonStyled } from "./styles";

const HeaderIconButtons = () => {
    return (
         <HeaderIconButtonsStyled>
            <HeaderLinkButtonStyled href={'/my-account'}>
                <AccountButton />
            </HeaderLinkButtonStyled>
            <CartButton count={3} />
            <HeartButton count={2} />
            {/* {popup === 'mini-cart' && (<MiniCartPopup />)} */}
        </HeaderIconButtonsStyled>
    );
}

export default HeaderIconButtons;