import { popupSet } from '@/store/slices/PopupSlice';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonStyled, IconStyled } from './styles';

const MobileSearchButton: React.FC = () => {
    const dispatch = useDispatch();
    const t = useTranslations("Search");

    return (
        <ButtonStyled onClick={() => dispatch(popupSet('mobile-search'))}>
            {t("Search")}
            <IconStyled
                src={'/assets/icons/search.svg'}
                alt={'Search'}
                width={24}
                height={24}
                unoptimized={true}
            />
        </ButtonStyled>
    );
};

export default MobileSearchButton;
