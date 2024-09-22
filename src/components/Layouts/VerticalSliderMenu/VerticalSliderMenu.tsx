import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { menus } from '@/components/mockmenus';
import { wpMenuProps } from '@/types/layouts/Menus';
import { NavLink } from '../Nav/styles';

const SliderWrapper = styled.div`
  position: relative;
 padding: 40px 0;

 width: 13vw;
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
const Slide = styled.li`
  @media (max-width: 768px) {
      text-align: center;
     height:22px;
    } 
 white-space: nowrap;
`;

const NavButton = styled.button`
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

const VerticalSlider: FC<wpMenuProps> = ({ menuId }) => {
  const sliderRef = React.createRef<Slider>();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    prevArrow: <NavButton className="prev" />,
    nextArrow: <NavButton className="next" />,
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };
 /*  const menus: MenuItemsType[] | undefined = useContext(MenusContext); */
  const menuItems = menus?.find(({ id }) => id === menuId)?.items;

  return (
    <SliderWrapper>
      <Slider ref={sliderRef} {...settings}>
        {menuItems && menuItems.map(({ title, url }) => (
          <Slide key={title}>
            <NavLink
              href={url}
            >
              {title}
            </NavLink>
          </Slide>
        ))}
      </Slider>
      <NavButton className="prev" onClick={goToPrev}>
        <KeyboardArrowUpIcon />
      </NavButton>
      <NavButton className="next" onClick={goToNext}>
        <KeyboardArrowDownIcon />
      </NavButton>
    </SliderWrapper>
  );
};

export default VerticalSlider;
