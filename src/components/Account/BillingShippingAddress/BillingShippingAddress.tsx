import { useTranslations } from "next-intl";
import { InfoLine } from "./styles";
import { AddressType } from "@/types/services";

interface BillingShippingAdressProps
{
    address: AddressType;
};

const BillingShippingAddress: React.FC<BillingShippingAdressProps> = ({ address }) =>
{
    const t = useTranslations("MyAccount");

    return (
        Object.entries(address).map(([key, value]) =>
            value !== '' && (
                <InfoLine key={key}>
                    <span>{t(key)}</span>
                    <span>{value}</span>
                </InfoLine>
            )
        )
    )
}

export default BillingShippingAddress;