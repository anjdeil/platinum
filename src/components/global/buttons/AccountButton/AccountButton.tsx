import { IconButtonProps } from '@/types/components/global/buttons/iconButton';
import { StyledIconButton } from '../IconButton/styles';

export default function AccountButton({ color = "#fff" }: IconButtonProps)
{
  return (
    <StyledIconButton>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M14.9723 10.6995C14.1912 11.2214 13.2728 11.5 12.3333 11.5C11.0736 11.5 9.86537 10.9996 8.97457 10.1088C8.08377 9.21796 7.58333 8.00978 7.58333 6.75C7.58333 5.81054 7.86191 4.89218 8.38385 4.11104C8.90578 3.32991 9.64763 2.72109 10.5156 2.36157C11.3835 2.00206 12.3386 1.90799 13.26 2.09127C14.1814 2.27455 15.0278 2.72695 15.6921 3.39125C16.3564 4.05554 16.8088 4.90191 16.9921 5.82332C17.1753 6.74473 17.0813 7.6998 16.7218 8.56775C16.3622 9.4357 15.7534 10.1775 14.9723 10.6995ZM3.08333 19.5C3.08333 17.8075 4.46773 16.4341 6.45916 15.4522C8.4223 14.4843 10.7843 14 12.3333 14C13.8824 14 16.2444 14.4843 18.2075 15.4522C20.1989 16.4341 21.5833 17.8075 21.5833 19.5V22H3.08333V19.5Z" stroke={color} />
      </svg>
    </StyledIconButton>
  );
}
