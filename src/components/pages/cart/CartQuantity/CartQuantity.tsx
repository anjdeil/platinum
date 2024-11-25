import React, { useCallback, useState } from 'react';
import { QuantityBlock, QuantityBtn, QuantityWrapper } from './style';
import PlusIcon from "@/components/global/icons/PlusIcon/PlusIcon";
import MinusIcon from "@/components/global/icons/MinusIcon/MinusIcon";
import { LineItemType } from '@/types/components/shop/product/products';
import debounce from 'lodash/debounce';

interface QuantityComponentProps {
    item: LineItemType;
    handleChangeQuantity: (product_id: number, action: 'inc' | 'dec' | 'value', variation_id?: number, newQuantity?: number) => void;
}

const CartQuantity: React.FC<QuantityComponentProps> = ({ item, handleChangeQuantity }) => {
    const [inputValue, setInputValue] = useState(item.quantity);

    const debouncedChangeHandler = useCallback(
        debounce((product_id, newQuantity, variation_id) => {
            handleChangeQuantity(product_id, 'value', variation_id, newQuantity);
        }, 900),
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!Number.isNaN(value) && value > 0) {
            setInputValue(value);
            debouncedChangeHandler(item.product_id, value, item.variation_id);
        }
    };

    return (
        <QuantityWrapper>
            <QuantityBtn
                onClick={() =>
                    handleChangeQuantity(item.product_id, 'dec', item.variation_id)
                }
            >
                <MinusIcon />
            </QuantityBtn>
            <QuantityBlock
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                min="1"
            />
            <QuantityBtn
                onClick={() =>
                    handleChangeQuantity(item.product_id, 'inc', item.variation_id)
                }
            >
                <PlusIcon />
            </QuantityBtn>
        </QuantityWrapper>
    );
};

export default CartQuantity;