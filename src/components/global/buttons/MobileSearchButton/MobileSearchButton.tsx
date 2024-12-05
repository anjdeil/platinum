import { popupSet } from '@/store/slices/PopupSlice';
import { useDispatch } from 'react-redux';
import { ButtonStyled, IconStyled } from './styles';


const MobileSearchButton = () => {
    const dispatch = useDispatch();

    return (
        <ButtonStyled onClick={() => dispatch(popupSet('mobile-search'))}>
            Search
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
