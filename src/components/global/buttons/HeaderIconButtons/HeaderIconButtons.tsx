import AccountButton from "@/components/global/buttons/AccountButton/AccountButton";
import CartButton from "@/components/global/buttons/CartButton/CartButton";
import HeartButton from "@/components/global/buttons/HeartButton/HeartButton";
import { HeaderIconButtonsStyled, HeaderLinkButtonStyled } from "./styles";
import { useRouter } from 'next/router';

const HeaderIconButtons = () => {
  const { locale } = useRouter();
  return (
    <HeaderIconButtonsStyled>
      <HeaderLinkButtonStyled href={`/${locale}/my-account`}>
        <AccountButton />
      </HeaderLinkButtonStyled>
      <CartButton count={3} />
      <HeartButton count={2} />
      {/* {popup === 'mini-cart' && (<MiniCartPopup />)} */}
    </HeaderIconButtonsStyled>
  );
};

export default HeaderIconButtons;