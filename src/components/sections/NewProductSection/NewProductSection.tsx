import { ProductListSectionData } from '@/types/components/sections';

type NewProductSectionProps = Omit<ProductListSectionData, '_type'>;

export const NewProductSection: React.FC<NewProductSectionProps> = ({
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
