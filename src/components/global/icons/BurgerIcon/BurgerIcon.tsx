import { IconComponentProps } from '@/types/components/global/buttons/iconButton';

const BurgerIcon: React.FC<IconComponentProps> = ({ color = "#fff" }) =>
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
      <path d="M1 9H19M1 1H19M1 17H19" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default BurgerIcon;