import { z } from 'zod';
import { SectionsTypeSchema } from '../components/sections';

export const HomePageSchema = z.object({
  data: z.object({
    item: z.object({
      sections: z.array(SectionsTypeSchema),
    }),
  }),
});

export type HomePageType = z.infer<typeof HomePageSchema>;
