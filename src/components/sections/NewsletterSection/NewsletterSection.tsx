import { NewsletterSectionData } from '@/types/components/sections/index';

type NewsletterSectionProps = Omit<NewsletterSectionData, '_type'>;

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  newsletter_separator,
}) => {
  return (
    <div>
      <h2>NewsletterSection</h2>
      <p>{newsletter_separator}</p>
    </div>
  );
};
