import { z } from 'zod';

export const BottomMenuWrapperPropsSchema = z.object({
    height: z.string().optional(),
    paddingBlock: z.string().optional()
});

export type BottomMenuWrapperProps = z.infer<typeof BottomMenuWrapperPropsSchema>;