import styled from "@emotion/styled";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export const SwiperContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	row-gap: 24px;
	position: relative;
`;

export const MainSwiper = styled(Swiper)`
	width: 100%;
`;

export const ImageWrapper = styled.button`
	width: 100%;
	height: auto;
	border: none;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	height: auto;
`;

export const ImageStyled = styled(Image)`
	width: 88%;
	height: auto;
	max-width: 452px;
	object-fit: contain;

	@media ${({ theme }) => theme.media.medium} {
		width: 100%;
	}
`;

export const CustomWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 14px;

	.swiper-button-disabled svg path {
		fill: ${({ theme }) => theme.colors.grey};;
	}
`;

export const ThumbsSwiper = styled(Swiper)`
	width: 100%;
	max-width: 356px;
	display: flex;
	gap: 40px;
	margin: 0 !important;
`;

export const SwiperSlideStyled = styled(SwiperSlide)`
	&.swiper-slide-thumb-active div {
		border-color: ${({ theme }) => theme.colors.secondary};
	} 
`;

export const ThumbnailWrapper = styled.div`
	width: 100%;
	aspect-ratio: 1;
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid transparent;

	&:hover {
		border-color: ${({ theme }) => theme.colors.secondary};
	}
`;

export const Thumbnail = styled(Image)`
	width: 100%;
	height: auto;
	object-fit: cover;
	cursor: pointer;	
`;

export const NavButton = styled.div`
	padding: 8px;
	cursor: pointer;
`;