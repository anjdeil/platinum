import { FC } from "react";
import { BenefitsInfoWrapper, BenefitsInfoTitle } from './styles'
import { CustomList } from "@/components/global/lists/List";
import { CustomSvgMarker } from "@/components/global/icons/CustomSvgMarker/CustomSvgMarker";

export const BenefitsInfo: FC = () => {
    return (
        <BenefitsInfoWrapper>
            <BenefitsInfoTitle>Delivery costs are not included in the purchase calculation.</BenefitsInfoTitle>
            <CustomList>
                <li><CustomSvgMarker />Free delivery within Poland for orders over 200 PLN.</li>
                <li><CustomSvgMarker />Free delivery to Germany, Austria, Slovakia, Slovenia, Belgium, Hungary, Lithuania, Czech Republic, Denmark, Romania, and Estonia for orders over 150 EUR.</li>
            </CustomList>
        </BenefitsInfoWrapper>
    )
}