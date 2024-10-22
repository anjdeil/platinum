import FreeDeliveryIcon from "@/components/global/icons/FreeDeliveryIcon/FreeDeliveryIcon";
import ShippingIcon from "@/components/global/icons/ShippingIcon/ShippingIcon";
import { ShippingItem, ShippingListContainer, ShippingTitle } from "./styles";

const ShippingList = () =>
{  
    return (
        <ShippingListContainer>
            <ShippingItem>
                <ShippingIcon />
                <ShippingTitle>
                    Fast shipping
                </ShippingTitle>
            </ShippingItem>
            <ShippingItem>
                <FreeDeliveryIcon />
                <ShippingTitle>
                    Free delivery over PLN 200
                </ShippingTitle>
            </ShippingItem>
        </ShippingListContainer>
    );
};

export default ShippingList;