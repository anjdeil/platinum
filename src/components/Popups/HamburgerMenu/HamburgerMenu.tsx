import CurrencySelect from "@/components/Common/Selects/CurrencySelect/CurrencySelect";
import LanguageSelect from "@/components/Common/Selects/LanguageSelect/LanguageSelect";
import Nav from "@/components/Layouts/Nav/Nav";
import { PopupType } from "@/types/Popups/PopupType";
import { useTheme } from "@emotion/react";
import { FC } from "react";
import MobilePopup from "../MobilePopup/MobilePopup";
import { NavWrap, SelectWrapper } from "./styles";

const HamburgerMenu: FC<PopupType> = ({ onClose }) => {
    const theme = useTheme();
    const scrollTop = window.scrollY;

    return (
        <MobilePopup onClose={onClose} scroll={scrollTop}>
            <NavWrap>
                <Nav
                    menuId={335}
                    skeleton={{
                        direction: 'column',
                        elements: 4,
                        width: "200px",
                        height: "24px",
                        gap: '20px'
                    }}
                    color={theme.colors.black}
                    direction='column'
                    align='flex-start'
                />
                <SelectWrapper>
                    <LanguageSelect />
                    <CurrencySelect />
                </SelectWrapper>
            </NavWrap>
        </MobilePopup>
    );
}

export default HamburgerMenu;