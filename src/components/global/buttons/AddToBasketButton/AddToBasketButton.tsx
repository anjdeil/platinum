import { AddToBasketButtonProps } from '@/types/components/global/buttons/addToBasketButton';
import { AddToBasketButtonStyled } from './styles';

const AddToBasketButton: React.FC<AddToBasketButtonProps> = ({
  mobFontSize,
  mobLineHeight,
  fontWeight,
  color,
  borderRadius,
  borderColor,
  hoverBackground,
  hoverColor,
  lineHeight,
  fontSize,
  maxWidth,
  height,
  children,
  onClick,
  active,
  disabled = false,
}) => {
  return (
    <AddToBasketButtonStyled
      mobFontSize={mobFontSize}
      mobLineHeight={mobLineHeight}
      fontWeight={fontWeight}
      color={color}
      borderRadius={borderRadius}
      borderColor={borderColor}
      hoverBackground={hoverBackground}
      hoverColor={hoverColor}
      lineHeight={lineHeight}
      fontSize={fontSize}
      maxWidth={maxWidth}
      height={height}
      onClick={onClick}
      active={active}
      disabled={disabled}
    >
      {children}
    </AddToBasketButtonStyled>
  );
};

export default AddToBasketButton;
