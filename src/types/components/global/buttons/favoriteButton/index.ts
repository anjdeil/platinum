import { z } from "zod";

export const FavoriteButtonPropsSchema = z.object({
    active: z.boolean().optional(),
});

export type FavoriteButtonProps = z.infer<typeof FavoriteButtonPropsSchema>;