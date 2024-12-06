import React, { useCallback, useState } from 'react';
import { QuantityBlock, QuantityBtn, QuantityWrapper } from './style';
import PlusIcon from "@/components/global/icons/PlusIcon/PlusIcon";
import MinusIcon from "@/components/global/icons/MinusIcon/MinusIcon";
import debounce from 'lodash/debounce';
import { lineOrderItems } from '@/types/store/reducers/сartSlice';

interface QuantityComponentProps {
    resolveCount: number | undefined;
    item: lineOrderItems;
    handleChangeQuantity: (
        product_id: number,
        action: 'inc' | 'dec' | 'value',
        variation_id?: number,
        newQuantity?: number
    ) => void;
}

const CartQuantity: React.FC<QuantityComponentProps> = ({
    item,
    handleChangeQuantity,
    resolveCount,
}) => {
    const maxCount = resolveCount ?? Infinity;
    const [inputValue, setInputValue] = useState(item.quantity);

    const debouncedChangeHandler = useCallback(
        debounce((product_id, newQuantity, variation_id) => {
            handleChangeQuantity(product_id, 'value', variation_id, newQuantity);
        }, 4000),
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
            handleChangeQuantity(item.product_id, 'inc', item.variation_id);
        }
    };

    const handleDecrease = () => {
        if (inputValue > 1) {
            const newValue = inputValue - 1;
            setInputValue(newValue);
            handleChangeQuantity(item.product_id, 'dec', item.variation_id);
        }
    };

    return (
        <QuantityWrapper>
            <QuantityBtn onClick={handleDecrease} disabled={inputValue <= 1}>
                <MinusIcon />
            </QuantityBtn>
            <QuantityBlock
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
