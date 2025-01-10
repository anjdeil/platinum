import { z } from 'zod'

export const FavoriteButtonPropsSchema = z.object({
  active: z.boolean().optional(),
  marginLeft: z.string().optional(),
  onClick: z.function().args().returns(z.void()).optional(),
  isLoading: z.boolean().optional(),
})

export type FavoriteButtonProps = z.infer<typeof FavoriteButtonPropsSchema>
