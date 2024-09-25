import { z } from 'zod';

export const BottomMenuWrapperPropsSchema = z.object({
    paddingBlock: z.string().optional(),
});

export type BottomMenuWrapperProps = z.infer<typeof BottomMenuWrapperPropsSchema>;