import React, { FC, useContext } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import { wpMenuProps } from '@/types/layouts/Menus/wp-menus';
import { MenuSkeleton } from "../MenuSkeleton";
import { MenusContext } from '@/components/Layout/Layout';
import { NavLink } from '../Nav/styles';

const StyledSlider = styled(Slider)`
  height: 300px;
`;

const PrevArrow = styled.div`
  position: absolute;
  top: 50%;
  left: -25px;
  z-index: 1;
  cursor: pointer;
  color: #000;
`;

const NextArrow = styled.div`
  position: absolute;
  top: 50%;
  right: -25px;
  z-index: 1;
  cursor: pointer;
  color: #000;
`;

export const VerticalSliderMenu: FC<wpMenuProps> = ({
  menuId,
  className = '',
  skeleton,
  justify,
  color,
  textTransform,
  fontSize,
  fontSizeMob,
  direction,
  textAlign,
  align,
  gap,
  mobGap,
}) => {

  const fakeMenuItems = [
    { title: 'Category 1', url: '/category-1' },
    { title: 'Category 2', url: '/category-2' },
    { title: 'Category 3', url: '/category-3' },
    { title: 'Category 4', url: '/category-4' },
    // Add more categories as needed
  ];

  const menuItems = fakeMenuItems;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    prevArrow: <PrevArrow><svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.5002 6.5C11.698 6.49996 11.8913 6.45107 12.0557 6.3595C12.2201 6.26793 12.3482 6.13779 12.4239 5.98555C12.4996 5.8333 12.5194 5.66577 12.4808 5.50414C12.4422 5.34251 12.347 5.19404 12.2072 5.0775L7.20721 0.910834C7.01968 0.754608 6.76538 0.666845 6.50021 0.666845C6.23505 0.666845 5.98074 0.754608 5.79321 0.910834L0.793212 5.0775C0.653402 5.19404 0.558197 5.34251 0.519629 5.50414C0.481062 5.66577 0.500865 5.8333 0.576535 5.98555C0.652205 6.1378 0.780345 6.26793 0.944755 6.3595C1.10916 6.45107 1.30246 6.49997 1.50021 6.5L11.5002 6.5Z" fill="#696969" /></svg></PrevArrow>,
    nextArrow: <NextArrow><svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.49979 0.5C1.30204 0.500035 1.10874 0.548928 0.944329 0.640498C0.779919 0.732069 0.651779 0.862205 0.576109 1.01445C0.500439 1.1667 0.480636 1.33423 0.519203 1.49586C0.557771 1.65749 0.652978 1.80596 0.792787 1.9225L5.79279 6.08917C5.98031 6.24539 6.23462 6.33316 6.49979 6.33316C6.76495 6.33316 7.01926 6.24539 7.20679 6.08917L12.2068 1.9225C12.3466 1.80596 12.4418 1.65749 12.4804 1.49586C12.5189 1.33423 12.4991 1.1667 12.4235 1.01445C12.3478 0.862205 12.2197 0.732069 12.0552 0.640498C11.8908 0.548928 11.6975 0.500035 11.4998 0.5L1.49979 0.5Z" fill="#696969" /></svg></NextArrow>,
  };

  if (!menuItems && skeleton) {
    return (
      <MenuSkeleton
        elements={skeleton.elements}
        direction={skeleton.direction}
        width={skeleton.width}
        height={skeleton.height}
        gap={skeleton.gap}
      />
    )
  }

  return (
    <div>
      <StyledSlider {...settings}>
        {menuItems && menuItems.map(({ title, url }) => (
          <div key={title}>
            <NavLink href={url}>
              {title}
            </NavLink>
          </div>
        ))}
        <div>&nbsp;</div>
      </StyledSlider>
    </div>
  );
}
