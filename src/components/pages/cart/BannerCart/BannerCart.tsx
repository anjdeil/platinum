import AddToBasketButton from "@/components/global/buttons/AddToBasketButton/AddToBasketButton";
import { Title } from "@/styles/components";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BannerContainer, BannerWrapper, ContentWrapper, ImageWrapper, StyledText } from "./styles";

const BannerCart = () =>
{    
    const t = useTranslations('Cart');

    return (
        <BannerContainer>
            <BannerWrapper>
                <ContentWrapper>
                    <StyledText>{t('welcomeToPlatinumShop')}</StyledText>
                    <Title as="h2" uppercase>
                        {t('theBest')}
                            <br/>
                        {t('productForYou')}
                    </Title>
                    <AddToBasketButton />
                </ContentWrapper>
                <ImageWrapper>
                    <Image
                        src="/images/bannerImage.png"
                        alt="cosmetics"
                        width={311}
                        height={311}
                        priority
                    />
                </ImageWrapper>
            </BannerWrapper>
        </BannerContainer>
    )
}

export default BannerCart;