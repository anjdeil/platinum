import { BadgeProps } from '@/types/components/global/buttons/badge';
import { BadgeWrapper } from './styles';

const Badge: React.FC<BadgeProps> = ({ count = 0 }) =>
{
  return <BadgeWrapper count={count}>{count}</BadgeWrapper>;
};

export default Badge;
