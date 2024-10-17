import CurrencySelect from "@/components/global/selects/CurrencySelect/CurrencySelect";
import Nav from "@/components/menus/Nav/Nav";
import { PopupType } from "@/types/Popups/PopupType";
import { useTheme } from "@emotion/react";
import { FC } from "react";
import MobilePopup from "../MobilePopup/MobilePopup";
import { NavWrap, SelectWrapper } from "./styles";
import LanguageSelect from "../../selects/LanguageSelect/LanguageSelect";

const HamburgerMenu: FC<PopupType> = ({ onClose }) => {
    const theme = useTheme();
    return (
        <MobilePopup onClose={onClose}>
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