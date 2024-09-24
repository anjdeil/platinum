import { SlideProps, SliderWrapperProps } from "@/types/layouts/Sliders/VerticalSlider";
import styled from "@emotion/styled";

export const SliderWrapper = styled.div<SliderWrapperProps>`
    position: relative;
    padding: 40px 0; 
    width: ${({ width = "13vw" }) => width}; //T_T
       @media (max-width: 1100px) {
    width: 30vw;
    } 
     @media (max-width: 768px) {
      width: 60vw;
    } 
     @media (max-width: 340px) {
      width: 76vw;
    }  
`;
export const Slide = styled.li<SlideProps>`
  @media (max-width: 768px) {
      text-align: center;
      height:22px;
    } 
    white-space: ${({ wrap = "nowrap" }) => wrap}; //T_T
`;

export const NavButton = styled.button`
      height:28px;
      color: white;
      width: 100%;
      border: 1px solid #738EBC;
      border-radius: 20px;
      position: absolute;
      background: none;
  cursor: pointer;
  z-index: 1;

  &.prev {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &.next {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
