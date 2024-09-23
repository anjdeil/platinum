import { z } from 'zod';

const SearchBarPropsSchema = z.object({
    width: z.string().optional(),
    backgroundColor: z.string().optional(),
})

export type SearchBarProps = z.infer<typeof SearchBarPropsSchema>;