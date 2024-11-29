import { HeroSectionData } from '@/types/components/sections/index';

type HeroSectionProps = Omit<HeroSectionData, '_type'>;

export const HeroSection: React.FC<HeroSectionProps> = ({
  is_reverse,
  image,
  object_fit,
  title,
  text,
}) => {
  return (
    <div>
      <h2>{title}</h2>

      <p>{text}</p>
      <img src={image} alt={title} />
    </div>
  );
};

// export const HeroSectionSchema = z.object({
//   _type: z.literal('hero'),
//   is_reverse: z.boolean(),
//   image: z.string().url(),
//   object_fit: z.enum(['cover', 'contain']),
//   title: z.string(),
//   text: z.string(),
// });
