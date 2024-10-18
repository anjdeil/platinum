import { ProductBadgeProps } from "@/types/components/shop";
import { BadgeStyled } from "./styles";

const ProductBadge: React.FC<ProductBadgeProps> = ({ type }) =>
{
    return (
        <BadgeStyled type={type}>
            {type}
        </BadgeStyled>
    );
};

export default ProductBadge;