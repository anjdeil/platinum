import { OrderType } from "@/types/services/woocommerce/OrderType";
import { useTranslations } from "next-intl";
import { BlockInfo, HeaderItem, HeaderItemName, InfoTitle, ListBody, ListHeader, ListItem, ProductImage, ProductListWrapper, StyledValue, WrapperBlock, WrapperBlockInfo, WrapperHeader } from "./styles";

interface AccountOrderProductListProps {
    order: OrderType;
}

const AccountOrderProductList: React.FC<AccountOrderProductListProps> = ({order}) =>
{    
    const t = useTranslations('MyAccount');

    return (
        <ProductListWrapper>
            <ListHeader>
                <HeaderItemName>{t("productName")}</HeaderItemName>
                <WrapperHeader>
                    <HeaderItem>{t("price")}</HeaderItem>
                    <HeaderItem>{t("quantity")}</HeaderItem>
                    <HeaderItem>{t("value")}</HeaderItem>
                </WrapperHeader>
            </ListHeader>
            <ListBody>
                {order.line_items.map(product => (
                    <ListItem key={product.product_id}>
                        <WrapperBlock>
                            <ProductImage width={60} height={60} src={product.image?.src || ''} alt="product image" />
                            <StyledValue>{product.name}</StyledValue>
                        </WrapperBlock>
                        <WrapperBlockInfo>
                            <BlockInfo>
                                <InfoTitle>
                                    {t("price")}
                                </InfoTitle>
                                <StyledValue>
                                    {product.price}
                                </StyledValue>
                            </BlockInfo>
                            <BlockInfo>
                                <InfoTitle>
                                    {t("quantity")}
                                </InfoTitle>
                                <StyledValue>
                                    {product.quantity}
                                </StyledValue>
                            </BlockInfo>
                            <BlockInfo>
                                <InfoTitle>
                                    {t("value")}
                                </InfoTitle>
                                <StyledValue>
                                    {product.total}
                                </StyledValue>
                            </BlockInfo>                           
                        </WrapperBlockInfo>
                    </ListItem>
                ))}
                
            </ListBody>
        </ProductListWrapper>
    )
}

export default AccountOrderProductList;