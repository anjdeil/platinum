import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { OrderTableWrapper, TableBody, TableHeader } from "./styles";

interface AccountOrderProductListProps {
    title: string;
    children: ReactNode;
}

const AccountOrderTable: React.FC<AccountOrderProductListProps> = ({title, children}) =>
{    
    const t = useTranslations('MyAccount');

    return (
        <OrderTableWrapper>
            <TableHeader>{t(title)}</TableHeader>
            <TableBody>{children}</TableBody>
        </OrderTableWrapper>
    )
}

export default AccountOrderTable;