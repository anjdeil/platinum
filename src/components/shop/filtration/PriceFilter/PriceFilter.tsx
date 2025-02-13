import { ChangeEvent, FC, useCallback } from 'react';
import { Divider, PriceFilterContainer, StyledSlider } from './styles';
import { FilterActionButtons } from '../filterActionButtons';
import {
  CustomInputStyle,
  CustomInputWrapper,
  Input,
} from '@/components/global/forms/CustomFormInput/styles';

interface PriceFilter {
  currencyCode: string;
  currentMin: number;
  currentMax: number;
  minPrice: number;
  maxPrice: number;
  updateMinPrice: (newValue: number) => void;
  updateMaxPrice: (newValue: number) => void;
  onReset: () => void;
  onApply: () => void;
  disabledApplyButton?: boolean;
}

export const PriceFilter: FC<PriceFilter> = props => {
  const {
    currencyCode,
    currentMin,
    currentMax,
    minPrice,
    maxPrice,
    updateMinPrice,
    updateMaxPrice,
    onReset,
    onApply,
    disabledApplyButton,
  } = props;

  const handleSliderChange = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (!Array.isArray(newValue)) return;

      if (newValue[0] !== currentMin) updateMinPrice(newValue[0]);

      if (newValue[1] !== currentMax) updateMaxPrice(newValue[1]);
    },
    [currentMin, currentMax, updateMinPrice, updateMaxPrice]
  );

  const onMinInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const newValue = inputValue ? Number(inputValue) : minPrice;
      updateMinPrice(newValue);
    },
    [updateMinPrice, minPrice]
  );

  const onMaxInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const newValue = Number(inputValue);
      updateMaxPrice(newValue);
    },
    [updateMaxPrice, maxPrice]
  );

  return (
    <>
      <StyledSlider
        getAriaLabel={() => 'Price filter range'}
        value={[currentMin, currentMax]}
        min={minPrice}
        max={maxPrice}
        onChange={handleSliderChange}
        step={1}
      />
      <PriceFilterContainer>
        <CustomInputStyle
          as={'label'}
          isError={false}
          isTextArea={false}
          isCheckbox={false}
          isPhone={false}
        >
          <CustomInputWrapper>
            <Input
              as="input"
              type="number"
              isError={false}
              value={currentMin.toString()}
              defaultValue={minPrice.toString()}
              onChange={onMinInputChange}
            />
          </CustomInputWrapper>
        </CustomInputStyle>
        <Divider />
        <CustomInputStyle
          as={'label'}
          isError={false}
          isTextArea={false}
          isCheckbox={false}
          isPhone={false}
        >
          <CustomInputWrapper>
            <Input
              as="input"
              type="number"
              isError={false}
              value={currentMax.toString()}
              defaultValue={maxPrice.toString()}
              onChange={onMaxInputChange}
            />
          </CustomInputWrapper>
        </CustomInputStyle>
        <p>{currencyCode}</p>
      </PriceFilterContainer>
      <FilterActionButtons
        onReset={onReset}
        onApply={onApply}
        isApply={true}
        disabledApplyButton={disabledApplyButton}
      />
    </>
  );
};
