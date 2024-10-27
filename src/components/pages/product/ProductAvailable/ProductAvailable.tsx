import { useTranslations } from "next-intl";
import { AvailableStyles, EmptyStyled } from "./styles";

const ProductAvailable = ({ count = 0 }) =>
{
    const t = useTranslations("Product");

    return (
        <>
            {count > 0 ? (
                <AvailableStyles>
                    {`${t("available", { count: count })}`}
                </AvailableStyles >
            ) : (
                <EmptyStyled>
                    {t(`notAvailable`)}
                </EmptyStyled >
            )}
            
        </>
    );
};

export default ProductAvailable;