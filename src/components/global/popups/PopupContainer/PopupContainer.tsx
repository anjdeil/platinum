import HamburgerMenu from '@/components/global/popups/HamburgerMenu';
import { switchCategory } from '@/components/shop/Archive';
import { useAppSelector } from '@/store';
import { popupClosed, popupClosedByType } from '@/store/slices/PopupSlice';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CommentPopup from '../CommentPopup/CommentPopup';
import MiniCart from '../MiniCart/MiniCart';
import MobileCategoriesMenu from '../MobileCategoriesMenu/MobileCategoriesMenu';
import MobileSearchPopup from '../MobileSearchPopup/MobileSearchPopup';
import SwiperPopup from '../SwiperPopup/SwiperPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import NotifyPopup from '../NotifyPopup/NotifyPopup';

const unscrollablePopups = [
  'mobile-search',
  'hamburger-menu',
  'swiper-popup',
  'mobile-cart',
  'mobile-categories',
  'login',
  'notify',
];

const PopupContainer = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { popupType, data } = useAppSelector(state => state.popup);

  useEffect(() => {
    dispatch(popupClosed());

    let firstClick = true;

    const handleClick = (event: MouseEvent) => {
      const somePopupOpen = Boolean(document.querySelector('.close-outside'));
      if (!somePopupOpen) {
        firstClick = true;
        return;
      }

      const target = event.target as HTMLElement;
      const targetHoverPopup = target?.closest('.hover.close-outside');
      if (!targetHoverPopup) {
        firstClick = true;
        dispatch(popupClosed());
      }

      if (firstClick) {
        firstClick = false;
        return;
      }

      const targetPopup = target?.closest('.close-outside');
      if (!targetPopup) {
        firstClick = true;
        dispatch(popupClosed());
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname]);

  useEffect(() => {
    if (popupType && unscrollablePopups.includes(popupType)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [popupType]);

  const closePopup = () => {
    if (popupType) {
      dispatch(popupClosedByType(popupType));
    }
  };

  switch (popupType) {
    case 'hamburger-menu': {
      return <HamburgerMenu onClose={closePopup} />;
    }
    case 'mobile-categories': {
      return (
        <MobileCategoriesMenu
          padding="all"
          switchCategory={switchCategory}
          width="100%"
          height="90%"
          onClose={closePopup}
        />
      );
    }
    case 'swiper-popup': {
      return <SwiperPopup onClose={closePopup} />;
    }
    case 'add-comment': {
      return <CommentPopup onClose={closePopup} />;
    }
    case 'mobile-search': {
      return <MobileSearchPopup onClose={closePopup} />;
    }
    case 'mini-cart': {
      return <MiniCart onClose={closePopup} />;
    }
    case 'login': {
      return <LoginPopup onClose={closePopup} />;
    }
    case 'notify': {
      return <NotifyPopup onClose={closePopup} data={data || {}} />;
    }
  }
};

export default PopupContainer;
