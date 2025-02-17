import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Divider, PriceFilterContainer, StyledSlider } from './styles';
import {
  CustomInputStyle,
  CustomInputWrapper,
  Input,
} from '@/components/global/forms/CustomFormInput/styles';

const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimeoutId(id);
    },
    [callback, delay, timeoutId]
  );

  return debouncedCallback;
};

interface PriceFilter {
  currencyCode: string;
  currentMin: number;
  currentMax: number;
  minPrice: number;
  maxPrice: number;
  updateMinPrice: (newValue: number) => void;
  updateMaxPrice: (newValue: number) => void;
  onReset?: () => void;
  onApply?: () => void;
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
  } = props;

  const handleSliderChange = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (!Array.isArray(newValue)) return;

      if (newValue[0] !== currentMin) updateMinPrice(newValue[0]);

      if (newValue[1] !== currentMax) updateMaxPrice(newValue[1]);
    },
    [currentMin, currentMax, updateMinPrice, updateMaxPrice]
  );

  const debouncedHandleChange = useDebouncedCallback(handleSliderChange, 100);

  const onMinInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const newValue = inputValue ? Number(inputValue) : minPrice;

      if (
        newValue !== currentMin &&
        newValue >= minPrice &&
        newValue <= maxPrice
      ) {
        updateMinPrice(newValue);
      } else {
        updateMinPrice(minPrice);
      }
    },
    [updateMinPrice, minPrice]
  );

  const onMaxInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const newValue = Number(inputValue);

      if (
        newValue !== currentMax &&
        newValue >= currentMin &&
        newValue <= maxPrice
      ) {
        updateMaxPrice(newValue);
      } else {
        updateMaxPrice(maxPrice);
      }
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
        onChange={debouncedHandleChange}
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
      {/* <ResetButton onClick={onReset}>{t('clearFilter')}</ResetButton> */}
    </>
  );
};
