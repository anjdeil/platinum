import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { OrderTableWrapper, TableBody, TableHeader } from "./styles";

interface OrderInfoProps {
    title: string;
    children: ReactNode;
}

const OrderInfo: React.FC<OrderInfoProps> = ({title, children}) =>
{    
    const t = useTranslations('MyAccount');

    return (
        <OrderTableWrapper>
            <TableHeader>{t(title)}</TableHeader>
            <TableBody>{children}</TableBody>
        </OrderTableWrapper>
    )
}

export default OrderInfo;