import { useAppSelector } from "@/store";
import { ProductPriceOldStyled, ProductPriceStyled } from "./styles";

interface ProductPriceProps {
    minPrice?: number | null;
    maxPrice?: number | null;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ minPrice, maxPrice }) =>
{
    const currency = useAppSelector((state) => state.currencySlice);

    return (
        <>
            {maxPrice && maxPrice !== minPrice && (
                <ProductPriceOldStyled>
                    {maxPrice}
                </ProductPriceOldStyled>
            )}
            <ProductPriceStyled>
                {`${minPrice}  ${currency.symbol}`}
            </ProductPriceStyled>
        </>
    );
};

export default ProductPrice;