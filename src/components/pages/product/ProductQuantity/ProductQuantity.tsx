import MinusIcon from "@/components/global/icons/MinusIcon/MinusIcon";
import PlusIcon from "@/components/global/icons/PlusIcon/PlusIcon";
import { ProductQuantityProps } from "@/types/components/shop/product/productQuantity";
import { QuantityButton, QuantityContainer, QuantityInput } from "./styles";

const ProductQuantity: React.FC<ProductQuantityProps> = ({ quantity, onChange }) =>
{
    const handleDecrease = () => {
        if (quantity > 0) {
            onChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        onChange(quantity + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 0 && value < 999999999) {
            onChange(value);
        }
    };

    return (
        <QuantityContainer>
            <QuantityButton onClick={handleDecrease} disabled={quantity === 1}>
                <MinusIcon />
            </QuantityButton>
            <QuantityInput
                type="number"
                value={quantity}
                onChange={handleInputChange}
            />
            <QuantityButton onClick={handleIncrease}>
                <PlusIcon />
            </QuantityButton>
        </QuantityContainer>
    );
};

export default ProductQuantity;