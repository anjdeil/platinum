import MinusIcon from '@/components/global/icons/MinusIcon/MinusIcon';
import PlusIcon from '@/components/global/icons/PlusIcon/PlusIcon';
import { ProductQuantityProps } from '@/types/components/shop/product/productQuantity';
import { QuantityButton, QuantityContainer, QuantityInput } from './styles';

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  quantity,
  onChange,
  stockQuantity,
}) => {
  const maxCount = Math.min(
    stockQuantity ?? Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER
  );

  const handleDecrease = () => {
    if (quantity > 0) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxCount) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(parseInt(e.target.value, 10), maxCount);
    if (!Number.isNaN(value) && value > 0) {
      onChange(value);
    } else if (value > maxCount) {
      onChange(maxCount);
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
