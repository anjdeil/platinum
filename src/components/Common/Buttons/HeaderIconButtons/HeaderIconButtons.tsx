import AccountButton from "@/components/Common/Buttons/AccountButton/AccountButton";
import CartButton from "@/components/Common/Buttons/CartButton/CartButton";
import HeartButton from "@/components/Common/Buttons/HeartButton/HeartButton";
import Link from "next/link";
import styled from "styled-components";

const HeaderIconButtonsStyled = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`;

const HeaderIconButtons = () => {
    return (
         <HeaderIconButtonsStyled>
            <Link href={'/my-account'}>
                <AccountButton />
            </Link>
            <CartButton count={3} />
            <HeartButton count={2} />
            {/* {popup === 'mini-cart' && (<MiniCartPopup />)} */}
        </HeaderIconButtonsStyled>
    );
}

export default HeaderIconButtons;