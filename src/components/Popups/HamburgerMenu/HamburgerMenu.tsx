import CurrencySelect from "@/components/Common/Selects/CurrencySelect/CurrencySelect";
import LanguageSelect from "@/components/Common/Selects/LanguageSelect/LanguageSelect";
import Nav from "@/components/Layouts/Navigation/Nav";
import { PopupType } from "@/types/Popups/PopupType";
import { FC } from "react";
import styled from "styled-components";
import MobilePopup from "../MobilePopup";

const NavWrap = styled.div`
    padding: 50px 0;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 24px;    
`;

const SelectWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HamburgerMenu: FC<PopupType> = ({ onClose }) => {

    return (
        <MobilePopup onClose={onClose}>
            <NavWrap>
                <Nav
                    menuId={335}
                    skeleton={{
                        direction: 'column',
                        elements: 5,
                        width: "200px",
                        height: "40px",
                        gap: '10px'
                    }}
                    color={({ theme }) => theme.colors.black}
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