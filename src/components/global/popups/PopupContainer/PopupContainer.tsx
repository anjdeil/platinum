import HamburgerMenu from "@/components/global/popups/HamburgerMenu";
import { useAppSelector } from "@/store";
import { popupClosed } from "@/store/slices/PopupSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MobileCategoriesMenu from "../MobileCategoriesMenu/MobileCategoriesMenu";

const unscrollablePopups = ['mobile-search', 'hamburger-menu', 'swiper-popup', 'mobile-cart', 'mobile-categories'];

const PopupContainer = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const popup = useAppSelector(state => state.popup);

    useEffect(() => {
        dispatch(popupClosed());

        let firstClick = true;

        const handleClick = (event: MouseEvent) => {
            const somePopupOpen = Boolean(document.querySelector(".close-outside"));
            if (!somePopupOpen) {
                firstClick = true;
                return;
            }

            if (firstClick) {
                firstClick = false;
                return;
            }

            const target = event.target as HTMLElement;
            const targetPopup = target?.closest(".close-outside");
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
        if (unscrollablePopups.some(popupName => popup === popupName)) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [popup]);

    const closePopup = () => {
        dispatch(popupClosed());
    }

    switch (popup) {        
        case 'hamburger-menu': {
            return (
                <HamburgerMenu onClose={closePopup} />
            )
        }
        case 'mobile-categories': {
            return (
                <MobileCategoriesMenu onClose={closePopup} />
            )
        }
    }
}

export default PopupContainer;