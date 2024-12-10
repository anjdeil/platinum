import React, { useCallback, useState } from 'react'
import { QuantityBlock, QuantityBtn, QuantityWrapper } from './style'
import PlusIcon from '@/components/global/icons/PlusIcon/PlusIcon'
import MinusIcon from '@/components/global/icons/MinusIcon/MinusIcon'
import debounce from 'lodash/debounce'
import { QuantityComponentProps } from '@/types/pages/cart'

const CartQuantity: React.FC<QuantityComponentProps> = ({
  item,
  handleChangeQuantity,
  resolveCount,
  inputWidth,
  inputHeight,
}) => {
  const maxCount = resolveCount ?? Infinity

  const [inputValue, setInputValue] = useState(item.quantity)

  const debouncedChangeHandler = useCallback(
    debounce((product_id, newQuantity, variation_id) => {
      handleChangeQuantity(product_id, 'value', variation_id, newQuantity)
    }, 1500),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(parseInt(e.target.value, 10), maxCount)
    if (!Number.isNaN(value) && value > 0) {
      setInputValue(value)
      debouncedChangeHandler(item.product_id, value, item.variation_id)
    } else if (value > maxCount) {
      setInputValue(maxCount)
    }
  }

  const handleIncrease = () => {
    if (inputValue < maxCount) {
      const newValue = inputValue + 1
      setInputValue(newValue)
      handleChangeQuantity(item.product_id, 'inc', item.variation_id, false)
    }
  }

  const handleDecrease = () => {
    if (inputValue > 1) {
      const newValue = inputValue - 1
      setInputValue(newValue)
      handleChangeQuantity(item.product_id, 'dec', item.variation_id, false)
    }
  }

  return (
    <QuantityWrapper>
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
  )
}

export default CartQuantity
