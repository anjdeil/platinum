import React, { FC, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { NavLink } from '../../../menus/Nav/styles';
import { NavButton, Slide, SliderWrapper } from './styles';
import { MenuSkeleton } from '../../../menus/MenuSkeleton';
import { MenusContext } from '@/components/Layout/Layout';
import { menuItemsType } from '@/types/services/wpCustomApi/menus';
import { wpMenuProps } from '@/types/menus/WpMenus';

const VerticalSlider: FC<wpMenuProps> = ({ menuId, skeleton }) => {
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

  const menus: menuItemsType[] | undefined = useContext(MenusContext);
  const menuItems = menus?.find(({ id }) => id === menuId)?.items;
  const sortedMenuItems = menuItems
    ? [...menuItems].sort((a, b) => {
        const aOrder = a.menu_order || 0;
        const bOrder = b.menu_order || 0;
        return aOrder - bOrder;
      })
    : [];

  if (!sortedMenuItems.length && skeleton) {
    return (
      <MenuSkeleton
        elements={skeleton.elements}
        direction={skeleton.direction}
        width={skeleton.width}
        height={skeleton.height}
        gap={skeleton.gap}
        dark={skeleton.dark}
        leftSide={skeleton.leftSide}
        verticalSlider={skeleton.verticalSlider}
      />
    );
  }
  return (
    <SliderWrapper>
      <Slider ref={sliderRef} {...settings}>
        {sortedMenuItems.length > 0 &&
          sortedMenuItems.map(({ title, url }) => (
            <Slide key={title}>
              <NavLink href={url}>{title}</NavLink>
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
