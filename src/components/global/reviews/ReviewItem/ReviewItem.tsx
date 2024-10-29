import { useGetProductQuery } from "@/store/rtk-queries/wpCustomApi";
import { ProductType } from "@/types/pages/shop";
import { ProductReviewType } from "@/types/pages/shop/reviews";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import Rating from "../../Rating/Rating";
import { FlexWrapper, ImageWrapper, MoreButton, ReviewContainer, ReviewName, ReviewText } from "./styles";

interface ReviewItemPropsType {
    review: ProductReviewType;
    isOpen: boolean;
    setOpened: (id: number) => void;
}

const ReviewItem: FC<ReviewItemPropsType> = ({ review, isOpen, setOpened }) => {
    const { data } = useGetProductQuery({ slug: 'silicone-patches-black' });
    const product: ProductType | undefined = data?.data?.item;

    const reviewTextRef = useRef<HTMLParagraphElement | null>(null);
    const [showReadMore, setShowReadMore] = useState(false);

    useEffect(() => {
        if (reviewTextRef.current) {
            const { scrollHeight } = reviewTextRef.current;
            setShowReadMore(scrollHeight > 48);
        }
    }, [review.review]);

    const reviewRef = useRef<HTMLDivElement | null>(null);

    useEffect(() =>
    {
        const currentRef = reviewRef.current;
        const observer = new IntersectionObserver(
            ([entry]) =>
            {
                if (!entry.isIntersecting && isOpen)
                {
                    setOpened(0);
                }
            }
        );

        if (currentRef) observer.observe(currentRef);

        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [ review, isOpen, setOpened]);

    return ( 
        <ReviewContainer ref={reviewRef}>
            <FlexWrapper>
                <ImageWrapper>
                    <Image
                        src={product?.images[0]?.src || ''}
                        width={64}
                        height={64}
                        alt={product?.name || ''}
                    />
                </ImageWrapper>
                <ReviewName>{review.reviewer}</ReviewName>
            </FlexWrapper>
            <Rating rating={review.rating} />
            <ReviewText 
                ref={reviewTextRef}
                collapsedSize="3rem"
                in={isOpen}
                timeout="auto"
            >{review.review}</ReviewText>
            {showReadMore && !isOpen &&
                <MoreButton onClick={() => setOpened(review.id)}>read more</MoreButton>
            }
        </ReviewContainer>
    );
};

export default ReviewItem;