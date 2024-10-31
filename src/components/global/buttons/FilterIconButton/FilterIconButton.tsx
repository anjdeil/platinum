import { IconButtonProps } from '@/types/components/global/buttons/iconButton';
import { StyledIconButton } from '../IconButton/styles';
import Badge from '../Badge/Badge';
import { StyledButton } from '@/styles/components';
import { StyledButtonProps } from '@/types/styles/components';
import { StyledFilteredButton } from './styles';


export default function FilterIconButton({ width,
    height,
    minWidthTablet,
    minWidthDesktop,
    color,
    backgroundColor,
    hoverColor,
    hoverBackgroundColor,
    padding,
    onClick
   }: StyledButtonProps) {
    return (
        <StyledFilteredButton
            width={width}
            height={height}
            minWidthTablet={minWidthTablet}
            minWidthDesktop={minWidthDesktop}
            color={color}
            backgroundColor={backgroundColor}
            hoverColor={hoverColor}
            hoverBackgroundColor={hoverBackgroundColor}
            padding={padding}
            onClick={onClick}
         
        >

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L20 5M4 19L7 19M4 5L8 5M11 19L20 19M17 12L20 12M4 12L13 12" stroke="white" stroke-linecap="round" />
                <path d="M8 5C8 6.10457 8.89543 7 10 7C11.1046 7 12 6.10457 12 5C12 3.89543 11.1046 3 10 3C8.89543 3 8 3.89543 8 5Z" stroke="white" stroke-linecap="round" />
                <path d="M13 12C13 13.1046 13.8954 14 15 14C16.1046 14 17 13.1046 17 12C17 10.8954 16.1046 10 15 10C13.8954 10 13 10.8954 13 12Z" stroke="white" stroke-linecap="round" />
                <path d="M7 19C7 20.1046 7.89543 21 9 21C10.1046 21 11 20.1046 11 19C11 17.8954 10.1046 17 9 17C7.89543 17 7 17.8954 7 19Z" stroke="white" stroke-linecap="round" />
            </svg>

        </StyledFilteredButton>
    );
}
