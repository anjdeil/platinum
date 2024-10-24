import { ReactNode } from "react";
import { BadgeWrapper } from "./styles";

interface ProductBadgeWrapperProps {
    children: ReactNode;
}
const ProductBadgeWrapper: React.FC<ProductBadgeWrapperProps> = ({ children }) =>
{
    return (
        <BadgeWrapper >
            {children}
        </BadgeWrapper>
    );
};

export default ProductBadgeWrapper;