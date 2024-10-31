import { AddToBasketButtonProps } from "@/types/components/global/buttons/addToBasketButton";
import { useTranslations } from "next-intl";
import { AddToBasketButtonStyled } from "./styles";

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
    mobileMaxWidth,
}) => {
    const t = useTranslations("Product");

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
            mobileMaxWidth={mobileMaxWidth}
        >
            {t("addToBasket")}
        </AddToBasketButtonStyled>
    );
}

export default AddToBasketButton;