import LoyaltyIcon from "@/components/Common/Icons/LoyaltyIcon/LoyaltyIcon";
import MoneyBagIcon from "@/components/Common/Icons/MoneyBagIcon/MoneyBagIcon";
import OrderIcon from "@/components/Common/Icons/OrderIcon/OrderIcon";
import { AccountInfoBlockListProps } from "@/types/layouts/Account";
import { MIN_TOTAL_TO_SILVER } from "@/utils/consts";
import { useTheme } from "@emotion/react";
import { useTranslations } from "next-intl";
import AccountInfoBlock from "../AccountInfoBlock/AccountInfoBlock";
import { StyledListContainer } from "./styles";

const AccountInfoBlockList: React.FC<AccountInfoBlockListProps> = ({ orderCount, totalAmount, loyaltyProgram, }) =>
{
    const t = useTranslations("MyAccount");
    const theme = useTheme();

    return (
        <StyledListContainer>
            <AccountInfoBlock
                icon={OrderIcon}
                title={t("numberOfOrders")}
                value={orderCount?.toString() || "\u00A0"}
                background={theme.background.infoGradient}
            />
            <AccountInfoBlock
                icon={MoneyBagIcon}
                title={t("totalOrderAmount")}
                value={totalAmount?.toString() || "\u00A0"}
                background={theme.background.infoGradient}
            />
            <AccountInfoBlock
                icon={LoyaltyIcon}
                title={loyaltyProgram ? t("loyaltyProgram") : t("missingToSilver")}
                value={loyaltyProgram ? loyaltyProgram : (MIN_TOTAL_TO_SILVER - Math.floor(totalAmount || 0)).toString()}
            />
        </StyledListContainer>
    )
}

export default AccountInfoBlockList;