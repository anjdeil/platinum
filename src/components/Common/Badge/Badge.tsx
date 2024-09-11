import styled from 'styled-components';

interface BadgeProps {
  count?: number;
}

const BadgeWrapper = styled.span<{ count: number }>`
  display: ${({ count }) => (count > 0 ? 'inline-block' : 'none')};
  box-sizing: border-box;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => `2px solid ${theme.colors.white}`};
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
`;

const Badge: React.FC<BadgeProps> = ({ count = 0 }) => {
  return <BadgeWrapper count={count}>{count}</BadgeWrapper>;
};

export default Badge;
