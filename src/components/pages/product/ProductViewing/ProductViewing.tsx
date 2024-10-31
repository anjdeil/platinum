import { useTranslations } from "next-intl";
import { ProductViewingStyles } from "./styles";

const ProductViewing = ({ count = 0 }) =>
{
    const t = useTranslations("Product");

    return (
        <ProductViewingStyles>
            {`${t("viewingThisProduct", { count: count })}`}
        </ProductViewingStyles >           
    );
};

export default ProductViewing;