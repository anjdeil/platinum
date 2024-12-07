import { AddToBasketButtonProps } from '@/types/components/global/buttons/addToBasketButton'
import { AddToBasketButtonStyled } from './styles'

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
  children,
  onClick,
  active,
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
      onClick={onClick}
      active={active}
    >
      {children}
    </AddToBasketButtonStyled>
  )
}

export default AddToBasketButton
