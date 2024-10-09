import { z } from 'zod';

export const SearchFormPropsSchema = z.object({
    height: z.string().optional(),
});

export const SearchInputPropsSchema = z.object({
    width: z.string().optional(),
    backgroundColor: z.string().optional(),
});

const SearchBarPropsSchema = z.object({
    ...SearchFormPropsSchema.shape,
    ...SearchInputPropsSchema.shape,
})

export type SearchFormProps = z.infer<typeof SearchFormPropsSchema>;
export type SearchInputProps = z.infer<typeof SearchInputPropsSchema>;
export type SearchBarProps = z.infer<typeof SearchBarPropsSchema>;