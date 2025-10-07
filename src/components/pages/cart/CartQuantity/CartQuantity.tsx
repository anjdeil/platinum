import MinusIcon from '@/components/global/icons/MinusIcon/MinusIcon';
import PlusIcon from '@/components/global/icons/PlusIcon/PlusIcon';
import { QuantityComponentProps } from '@/types/pages/cart';
import debounce from 'lodash/debounce';
import React, { useCallback, useState } from 'react';
import { QuantityBlock, QuantityBtn, QuantityWrapper } from './style';

export const adaptItemToCartQuantity = (
  item: any
): QuantityComponentProps['item'] => {
  return {
    id: item.id,
    name: item.name,
    parent_name: item.parent_name || '',
    product_id: item.product_id,
    variation_id: item.variation_id ?? 0,
    quantity: item.quantity,
    tax_class: item.tax_class || '',
    subtotal: item.subtotal || '',
    subtotal_tax: item.subtotal_tax || '',
    total: item.total || '',
    total_tax: item.total_tax || '',
    taxes: item.taxes || [],
    meta_data: item.meta_data || [],
    image: item.image ? { id: item.image.id, src: item.image.src } : undefined,
    sku: item.sku || '',
    price: item.price || 0,
  };
};

const CartQuantity: React.FC<QuantityComponentProps> = ({
  disabled,
  item,
  handleChangeQuantity,
  resolveCount,
  inputWidth,
  inputHeight,
}) => {
  const maxCount = Math.min(
    resolveCount ?? Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER
  );

  const [inputValue, setInputValue] = useState(item.quantity);

  const debouncedChangeHandler = useCallback(
    debounce((product_id, newQuantity, variation_id) => {
      handleChangeQuantity(product_id, 'value', variation_id, newQuantity);
    }, 1100),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(parseInt(e.target.value, 10), maxCount);
    if (!Number.isNaN(value) && value > 0) {
      setInputValue(value);
      debouncedChangeHandler(item.product_id, value, item.variation_id);
    } else if (value > maxCount) {
      setInputValue(maxCount);
    }
  };

  const handleIncrease = () => {
    if (inputValue < maxCount) {
      const newValue = inputValue + 1;
      setInputValue(newValue);
      handleChangeQuantity(item.product_id, 'inc', item.variation_id, false);
    }
  };

  const handleDecrease = () => {
    if (inputValue > 1) {
      const newValue = inputValue - 1;
      setInputValue(newValue);
      handleChangeQuantity(item.product_id, 'dec', item.variation_id, false);
    }
  };

  return (
    <QuantityWrapper isDisabled={disabled}>
      <QuantityBtn onClick={handleDecrease} disabled={inputValue <= 1}>
        <MinusIcon />
      </QuantityBtn>
      <QuantityBlock
        inputWidth={inputWidth}
        inputHeight={inputHeight}
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        min="1"
        max={resolveCount?.toString()}
      />
      <QuantityBtn onClick={handleIncrease} disabled={inputValue >= maxCount}>
        <PlusIcon />
      </QuantityBtn>
    </QuantityWrapper>
  );
};

export default CartQuantity;
