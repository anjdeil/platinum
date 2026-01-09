import MinusIcon from '@/components/global/icons/MinusIcon/MinusIcon';
import PlusIcon from '@/components/global/icons/PlusIcon/PlusIcon';
import { ProductQuantityProps } from '@/types/components/shop/product/productQuantity';
import { MAX_QUANTITY } from '@/utils/consts';
import { QuantityButton, QuantityContainer, QuantityInput } from './styles';

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  quantity,
  onChange,
  stockQuantity,
}) => {
  const maxCount = Math.min(
    stockQuantity ?? Number.MAX_SAFE_INTEGER,
    MAX_QUANTITY
  );

  const handleDecrease = () => {
    if (quantity > 1) {
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
      <QuantityButton onClick={handleDecrease} disabled={quantity <= 1}>
        <MinusIcon />
      </QuantityButton>
      <QuantityInput
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={1}
        max={maxCount}
      />
      <QuantityButton onClick={handleIncrease} disabled={quantity >= maxCount}>
        <PlusIcon />
      </QuantityButton>
    </QuantityContainer>
  );
};

export default ProductQuantity;
