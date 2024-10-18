import { useTranslations } from "next-intl";
import { AddToBasketButtonStyled } from "./styles";

const AddToBasketButton: React.FC = () => {
    const t = useTranslations("Product");

    return (
        <AddToBasketButtonStyled>
            {t("addToBasket")}
        </AddToBasketButtonStyled>
    );
}

export default AddToBasketButton;