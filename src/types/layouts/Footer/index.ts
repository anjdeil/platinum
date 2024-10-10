import { z } from 'zod';

export const FooterContainerPropsSchema = z.object({
  backgroundColor: z.string().optional(),
});

export const FooterColumnPropsSchema = z.object({
  width: z.string().optional(),
});

export type FooterContainerProps = z.infer<typeof FooterContainerPropsSchema>;
export type FooterColumnProps = z.infer<typeof FooterColumnPropsSchema>;
  