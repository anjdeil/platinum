import React, { useEffect, useRef, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { SwiperRef, SwiperSlide } from 'swiper/react';

import FavoriteButton from '@/components/global/buttons/FavoriteButton/FavoriteButton';
import BackArrow from '@/components/global/icons/BackArrow/BackArrow';
import ForwardArrow from '@/components/global/icons/ForwardArrow/ForwardArrow';
import { SwiperProps } from '@/types/components/global/sliders/productSwiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductBadge from '../ProductBadge/ProductBadge';
import ProductBadgeWrapper from '../ProductBadgeWrapper/ProductBadgeWrapper';
import { CustomWrapper, ImageStyled, ImageWrapper, MainSwiper, NavButton, SwiperContainer, SwiperSlideStyled, Thumbnail, ThumbnailWrapper, ThumbsSwiper } from './styles';


const ProductSwiper: React.FC<SwiperProps> = ({ data }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

	const swiperRef = useRef<SwiperRef>(null);
	const heightRef = useRef<number | null>(null);
	
	useEffect(() => {
        const updateHeight = () => {
            if (swiperRef.current) {
                const currentHeight = swiperRef.current?.swiper.el.offsetHeight;

                if (heightRef.current === null) {
                    heightRef.current = currentHeight;
                }
            }
        };

        const handleImagesLoad = () => {
            updateHeight();
        };

        const images = swiperRef.current?.swiper.el.querySelectorAll('img');
        if (heightRef.current === null && images) {
            images.forEach((img) => {
                if (img.complete) {
                    handleImagesLoad();
                } else {
                    img.addEventListener('load', handleImagesLoad);
                    img.addEventListener('error', handleImagesLoad);
                }
            });
        }

        updateHeight();

        const handleResize = () => {
            heightRef.current = null;
            if (swiperRef.current) {
                swiperRef.current.swiper.el.style.minHeight = 'unset';
            }
            updateHeight();
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            if (images) {
                images.forEach((img) => {
                    img.removeEventListener('load', handleImagesLoad);
                    img.removeEventListener('error', handleImagesLoad);
                });
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [data]);
		
	const navPrevElId = `swiper-navPrev`;
	const navNextElId = `swiper-navNext`;
	
	return (
		<SwiperContainer>
			<ProductBadgeWrapper>
				<ProductBadge type="sale" />
				<FavoriteButton active={false} />
			</ProductBadgeWrapper>
			<MainSwiper
				ref={swiperRef}
				spaceBetween={10}
				centeredSlides={true}
				modules={[FreeMode, Thumbs]}
				style={{ minHeight: heightRef.current ? heightRef.current : 'auto'}}
				thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
			>
				
				{data.map((item, index) => (
					<SwiperSlide key={index}>
						<ImageWrapper>
							<ImageStyled
								unoptimized={true}
								priority
								src={item.src}
								alt={`Product ${index + 1}`}
								width={452}
								height={452}
							/>
						</ImageWrapper>
					</SwiperSlide>
				))}
			</MainSwiper>

			<CustomWrapper>
				<NavButton id={navPrevElId}>
                    <BackArrow />
                </NavButton>
				<ThumbsSwiper
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					slidesPerView={3}
					navigation={{
						nextEl: `#${navNextElId}`,
                        prevEl: `#${navPrevElId}`,
                    }}
					modules={[Navigation, Thumbs]}
				>
					{data.map((item, index) => (
						<SwiperSlideStyled key={index}>
							<ThumbnailWrapper>
								<Thumbnail
									src={item.src}
									alt={`Thumbnail ${index + 1}`}
									width={92}
									height={92}
								/>
							</ThumbnailWrapper>
						</SwiperSlideStyled>
					))}
				</ThumbsSwiper>
				<NavButton id={navNextElId}>
                    <ForwardArrow />
                </NavButton>                
			</CustomWrapper>
		</SwiperContainer>
	);
};

export default ProductSwiper;
