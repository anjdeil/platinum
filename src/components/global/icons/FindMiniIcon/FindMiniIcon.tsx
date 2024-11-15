import { IconButtonProps } from '@/types/components/global/buttons/iconButton';

const FindMiniIcon: React.FC<IconButtonProps> = ({ color = "#fff" }) => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default FindMiniIcon;