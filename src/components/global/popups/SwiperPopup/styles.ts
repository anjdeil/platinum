import { NavigationButtonProps } from "@/types/pages/product";
import styled from "@emotion/styled";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export const PopupOverlay = styled.div`
	position: fixed;
	z-index: 1000;
	background-color: rgba(0, 0, 0, 0.4);
	inset: 0;
`;

export const PopupBody = styled.div`
	box-sizing: border-box;
	max-width: 690px;
	width: 100%;
	height: auto;
	padding: 20px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.white};

	@media ${({ theme }) => theme.media.medium} {
		max-width: calc(100% - 40px);
		padding: 30px 20px;
	}
`;

export const CloseWrapper = styled.div`
	position: absolute;
	z-index: 10;
	top: 10px;
	right: 10px;

	@media ${({ theme }) => theme.media.medium} {
		top: 0;
		right: 0;
	}
`;

export const StyledSwiper = styled(Swiper)`
	& .swiper-wrapper {
		display: flex;
		align-items: center;
	}

	.swiper-button-disabled svg path {
		fill: ${({ theme }) => theme.colors.grey};
	}
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
	display: flex !important;
	justify-content: center;
	align-items: center;
`;

export const SlideImage = styled(Image)`
	max-width: 590px;
	width: 100%;
	height: auto;
`;

export const NavigationButton = styled.div<NavigationButtonProps>`
	position: absolute;
	z-index: 10;
	top: 50%;
	transform: translateY(-50%);
	left: ${({ prev }) => prev ? '0' : 'unset'} !important;
	right: ${({ next }) => next ? '0' : 'unset'} !important;
	padding: 8px;
	cursor: pointer;
`;