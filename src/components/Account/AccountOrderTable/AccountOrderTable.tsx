import { OrderType } from "@/types/services/woocommerce/OrderType";
import { useTranslations } from "next-intl";

interface AccountOrderProductListProps {
    order: OrderType;
}

const AccountOrderTable: React.FC<AccountOrderProductListProps> = ({order}) =>
{    
    const t = useTranslations('MyAccount');

    return (
        
    )
}

export default AccountOrderTable;