import { IconButtonProps } from '@/types/components/global/buttons/iconButton';

const BackIcon: React.FC<IconButtonProps> = ({ color = "#252525" }) => {
    return (
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L1 9L9 17" stroke={color} />
        </svg>
    );
}

export default BackIcon;