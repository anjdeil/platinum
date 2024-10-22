import { useEffect, useState } from "react";
import { ItemBlock, ItemCount, ItemText, PromotionContainer, PromotionTitle, TimerContainer } from "./styles";

interface ProductPromotion {
    time: Date;
}

const ProductPromotion: React.FC<ProductPromotion> = ({ time }) =>
{
    const [timeLeft, setTimeLeft] = useState<number>(time.getTime() - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeLeft = time.getTime() - Date.now();
            setTimeLeft(newTimeLeft <= 0 ? 0 : newTimeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return (
        <PromotionContainer>
            <PromotionTitle>
                The end of the promotion
            </PromotionTitle>
            <TimerContainer>
                <ItemBlock>
                    <ItemCount>
                        {days}
                    </ItemCount>
                    <ItemText>
                        Days
                    </ItemText>
                </ItemBlock>
                <ItemBlock>
                    <ItemCount>
                        {hours.toString().padStart(2, '0')}
                    </ItemCount>
                    <ItemText>
                        hours
                    </ItemText>
                </ItemBlock>
                <ItemBlock>
                    <ItemCount>
                        {minutes.toString().padStart(2, '0')}
                    </ItemCount>
                    <ItemText>
                        minutes
                    </ItemText>
                </ItemBlock>
            </TimerContainer>
        </PromotionContainer>
    );
};

export default ProductPromotion;