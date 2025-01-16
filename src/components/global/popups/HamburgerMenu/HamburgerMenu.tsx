import CurrencySelect from '@/components/global/selects/CurrencySelect/CurrencySelect';
import Nav from '@/components/menus/Nav/Nav';
import { MobilePopupPropsType } from '@/types/components/global/popups/mobilePopup';
import { useTheme } from '@emotion/react';
import { FC } from 'react';
import LanguageSelect from '../../selects/LanguageSelect/LanguageSelect';
import MobilePopup from '../MobilePopup/MobilePopup';
import { NavWrap, SelectWrapper } from './styles';

const HamburgerMenu: FC<MobilePopupPropsType> = ({ onClose }) => {
  const theme = useTheme();
  const scrollTop = window.scrollY;
  return (
    <MobilePopup onClose={onClose} scroll={scrollTop} closeButton={true}>
      <NavWrap>
        <Nav
          menuId={335}
          skeleton={{
            direction: 'column',
            elements: 4,
            width: '200px',
            height: '24px',
            gap: '20px',
          }}
          color={theme.colors.black}
          direction="column"
          align="flex-start"
          textalign="left"
        />
        <SelectWrapper>
          <LanguageSelect />
          <CurrencySelect />
        </SelectWrapper>
      </NavWrap>
    </MobilePopup>
  );
};

export default HamburgerMenu;
