import { z } from 'zod';

export const SocialsContainerPropsSchema = z.object({
  margin: z.string().optional(),
  secondary: z.boolean().optional(),
});
export const SocialItemLinkPropsSchema = z.object({
  itemmargin: z.string().optional(),
});

const SocialsPropsSchema = z.object({
  ...SocialsContainerPropsSchema.shape,
  ...SocialItemLinkPropsSchema.shape,
  iconscolor: z.string().optional(),
  text: z.boolean(),
  textcolor: z.string().optional(),
});

export type SocialsContainerProps = z.infer<typeof SocialsContainerPropsSchema>;
export type SocialsProps = z.infer<typeof SocialsPropsSchema>;
export type SocialItemLinkProps = z.infer<typeof SocialItemLinkPropsSchema>;
