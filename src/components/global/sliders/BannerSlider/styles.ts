import { BannerWrapperProps } from "@/types/components/global/sliders/BannerSlider";
import styled from "@emotion/styled";
import Link from "next/link";
import { Swiper } from "swiper/react";
import FallbackImage from "../../FallbackImage/FallbackImage";

export const BannerWrapper = styled.div<BannerWrapperProps>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ proportion = 2.74 }) => proportion};
  ${({ isMainPage }) => !isMainPage && 'max-width: 20px;'}
  margin: auto;
  overflow: hidden;

  @media ${({ theme }) => theme.media.medium} {
    aspect-ratio: 0.65;
    max-height: calc(100vh - 120px);
    margin: auto;
    padding-top: ${({ isMainPage }) => (isMainPage ? '0px' : '20px')};
  }
`;

export const ContentWrapper = styled.div`
    min-width: 240px;
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    align-items: center;
    justify-content: center;

    @media ${({ theme }) => theme.media.large} {
        row-gap: 8px;
    }

    @media ${({ theme }) => theme.media.medium} {
        left: 50%;
        top: 10%;
        transform: translate(-50%, 0);
    }
`;

export const StyledText = styled.p`
    font: ${({ theme }) => theme.fonts.bodysmallReg};
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;
    text-align: center;
`;

export const StyledLink = styled(Link)`
    &::after {
        content: '';
        position: absolute;
        inset: 0;
    }
`;

export const CustomSwiper = styled(Swiper)`
	width: 100%;
	height: 100%;
	display: flex;

	& .swiper-wrapper {
		display: flex;
	}

    & .swiper-pagination {
        display: flex;
        gap: 4px;
        margin-top: -16px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 10px;
        z-index: 5;

        &-bullet {
            border-radius: 10px;
            cursor: pointer;
            width: 34px;
            height: 2px;
            background-color: ${({ theme }) => theme.colors.lightBorder};
            &-active {
                background-color: ${({ theme }) => theme.colors.active};
            }
        }
    }
`;

export const ImageStyled = styled(FallbackImage)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;

export const SliderPlaceholder = styled.div`
    position: absolute;
    inset: 0;
    z-index: 3;
`;