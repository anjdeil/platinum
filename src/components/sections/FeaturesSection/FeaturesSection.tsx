import { FeaturesSectionData } from '@/types/components/sections/index';

type FeaturesSectionProps = Omit<FeaturesSectionData, '_type'>;

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  subtitle,
  title,
  items,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <a href={item.link_url}>{item.link_text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// const FeatureItemSchema = z.object({
//   _type: z.literal('_'),
//   image: z.string(),
//   contrast_bg: z.boolean(),
//   title: z.string(),
//   text: z.string(),
//   link_text: z.string(),
//   link_url: z.string().url(),
// });

// export const FeaturesSectionSchema = z.object({
//   _type: z.literal('features'),
//   subtitle: z.string(),
//   title: z.string(),
//   items: z.array(FeatureItemSchema),
// });
