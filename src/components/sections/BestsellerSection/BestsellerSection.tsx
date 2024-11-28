import { ProductListSectionData } from '@/types/components/sections';

type BestsellerSectionProps = Omit<ProductListSectionData, '_type'>;

export const BestsellerSection: React.FC<BestsellerSectionProps> = ({
  subtitle,
  title,
  products,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
