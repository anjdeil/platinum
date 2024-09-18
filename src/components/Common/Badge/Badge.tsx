import { BadgeWrapper } from './styles';

interface BadgeProps {
    count?: number;
}

const Badge: React.FC<BadgeProps> = ({ count = 0 }) => {
  return <BadgeWrapper count={count}>{count}</BadgeWrapper>;
};

export default Badge;
