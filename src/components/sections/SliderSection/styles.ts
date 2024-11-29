import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const StyledContainer = styled.div`
   {
    background-color: #f5f5f5;
    width: 100%;
    margin: 0 auto;
  }
`;
export const StyledSlider = styled(Slider)`
  .slick-slider {
    margin: 0 auto;
  }

  .slick-list {
    width: 100%;
  }

  .slick-slide img {
    width: 100%;
  }

  @media ${({ theme }) => theme.media.medium} {
    justify-content: center;
    .desktopImage {
      display: none;
    }
    .mobileImage {
      display: block;
      text-align: center;
      overflow: hidden;
    }
  }

  // If you need to make custom dots
  /*
  .slick-dots {
    bottom: 18px;
    display: flex !important;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  .slick-dots li {
    width: 34px;
    height: 2px;
    margin: 0 4px;
  }

  .slick-dots li button:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: url('/assets/icons/home-slider-dot.svg') no-repeat center center;
    background-size: contain;
  }

  .slick-dots li.slick-active button:before {
    background: url('/assets/icons/home-slider-dot-active.svg') no-repeat center
      center;
    background-size: contain;
  }
  */
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  .desktopImage {
    display: block;

    @media ${({ theme }) => theme.media.large} {
      height: 316px;
    }
  }

  .mobileImage {
    display: none;
  }

  @media ${({ theme }) => theme.media.medium} {
    .desktopImage {
      display: none;
    }
    .mobileImage {
      display: block;
    }
  }
`;
