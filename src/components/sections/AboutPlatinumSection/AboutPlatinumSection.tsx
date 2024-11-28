import { AboutPlatinumSectionData } from '@/types/components/sections';

type AboutPlatinumSectionProps = Omit<AboutPlatinumSectionData, '_type'>;

export const AboutPlatinumSection: React.FC<AboutPlatinumSectionProps> = ({
  about_platinum_separator,
}) => {
  return (
    <div>
      <h2>AboutPlatinumSection</h2>
      <p>{about_platinum_separator}</p>
    </div>
  );
};
