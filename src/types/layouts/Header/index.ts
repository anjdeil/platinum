import { z } from 'zod';

export const HeaderWrapperPropsSchema = z.object({
    backgroundColor: z.string().optional(),
});

export const HeaderContainerPropsSchema = z.object({
    gap: z.string().optional(),
});

export type HeaderWrapperProps = z.infer<typeof HeaderWrapperPropsSchema>;
export type HeaderContainerProps = z.infer<typeof HeaderContainerPropsSchema>;