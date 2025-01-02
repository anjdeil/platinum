import { z } from 'zod';

export const FavoriteButtonPropsSchema = z.object({
  active: z.boolean().optional(),
  marginLeft: z.string().optional(),
  onClick: z.function().args().returns(z.void()).optional(),
  isLoading: z.boolean(),
});

export type FavoriteButtonProps = z.infer<typeof FavoriteButtonPropsSchema>;
