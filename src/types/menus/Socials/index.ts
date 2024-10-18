import { z } from 'zod';

export const SocialsContainerPropsSchema = z.object({
    margin: z.string().optional(),
});
export const SocialItemLinkPropsSchema = z.object({
    itemmargin: z.string().optional(),
});

const SocialsPropsSchema = z.object({
    ...SocialsContainerPropsSchema.shape,
    ...SocialItemLinkPropsSchema.shape,
    iconscolor: z.enum(['dark', 'white']),
    text: z.boolean()
})

export type SocialsContainerProps = z.infer<typeof SocialsContainerPropsSchema>;
export type SocialsProps = z.infer<typeof SocialsPropsSchema>;
export type SocialItemLinkProps = z.infer<typeof SocialItemLinkPropsSchema>;
