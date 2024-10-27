import { ProductSkuStyles } from "./styles";

const ProductSku = ({ sku = '' }) =>
{
    return (
        <ProductSkuStyles>
            {sku}
        </ProductSkuStyles >           
    );
};

export default ProductSku;