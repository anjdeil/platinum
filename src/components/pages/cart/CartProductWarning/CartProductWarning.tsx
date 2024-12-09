import React from "react";
import { UpdateButton, WarningWrapper } from "./style";
import { useTranslations } from "next-intl";

interface CartProductWarningProps {
    onUpdate: () => void;
    resolveCount: number
}

const CartProductWarning: React.FC<CartProductWarningProps> = ({ onUpdate, resolveCount, }) => {
    const t = useTranslations("Cart");
    return (
        <WarningWrapper>
            {resolveCount === 0 ?
                (
                    <>
                        <span>{t("productNotAvailable")}</span>
                        <UpdateButton onClick={onUpdate}>{t("delete")}</UpdateButton>
                    </>)
                :
                (<>
                    <div>

                        <span>{t("productNotAvailableQuantity")}</span>
                    </div>
                    <UpdateButton onClick={onUpdate}>{t("updateTo")}&nbsp;{resolveCount}</UpdateButton>
                </>)}
        </WarningWrapper>
    );
};

export default CartProductWarning;
