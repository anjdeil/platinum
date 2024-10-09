import AccountButton from "@/components/Common/Buttons/AccountButton/AccountButton";
import CartButton from "@/components/Common/Buttons/CartButton/CartButton";
import HeartButton from "@/components/Common/Buttons/HeartButton/HeartButton";
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