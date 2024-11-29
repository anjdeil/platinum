import { BlogSectionData } from '@/types/components/sections';

type BlogSectionProps = Omit<BlogSectionData, '_type'>;

export const BlogSection: React.FC<BlogSectionProps> = ({}) => {
  return (
    <div>
      <h2>BlogSection</h2>
    </div>
  );
};
