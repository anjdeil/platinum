import { z } from 'zod';

export const TitleCatalogPropsSchema = z.object({
    fontSize: z.string().optional(),
    mobFontSize: z.string().optional(),
    lineHeight: z.string().optional(),
    mobLineHeight: z.string().optional(),
    fontWeight: z.number().optional(),
});

export type TitleCatalogProps = z.infer<typeof TitleCatalogPropsSchema>;