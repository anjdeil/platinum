import { CategoriesSectionData } from '@/types/components/sections/index';

type CategoriesSectionProps = Omit<CategoriesSectionData, '_type'>;

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  subtitle,
  title,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};
