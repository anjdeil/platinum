import CurrencySelect from "@/components/CurrencySelect/CurrencySelect";
import LanguageSelect from "@/components/LanguageSelect/LanguageSelect";
import Nav from "@/components/Layouts/Navigation/Nav";
import { PopupType } from "@/types/Popups/PopupType";
import { Box } from "@mui/material";
import { FC } from "react";
import MobilePopup from "../MobilePopup";
import styles from "./styles.module.scss";

const HamburgerMenu: FC<PopupType> = ({ onClose }) => {

    return (
        <MobilePopup onClose={onClose}>
            <div className={styles['hamburger-menu__nav-wrap']}>
                <Nav
                    menuId={335}
                    className={styles['hamburger-menu__nav']}
                    skeleton={
                        {
                            isColumn: true,
                            elements: 5,
                            width: "200px",
                            height: "40px",
                            gap: '10px'
                        }
                    }
                />
                <Box className={styles['hamburger-menu__select']}>
                    <LanguageSelect />
                    <CurrencySelect />
                </Box>
            </div>
        </MobilePopup>
    );
}

export default HamburgerMenu;