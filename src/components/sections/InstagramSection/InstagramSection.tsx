import { InstagramSectionData } from '@/types/components/sections/index';

type InstagramSectionProps = Omit<InstagramSectionData, '_type'>;

export const InstagramSection: React.FC<InstagramSectionProps> = ({
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
