import { ProductViewingStyles } from "./styles";

const ProductViewing = ({ count = 0 }) =>
{
    return (
        <ProductViewingStyles>
            {`Viewing this product: ${count}`}
        </ProductViewingStyles >           
    );
};

export default ProductViewing;