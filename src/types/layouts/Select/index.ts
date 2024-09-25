import { z } from "zod";

export const SelectOptionsPropsSchema = z.object({
    code: z.string(),
    symbol: z.string(),
});

export const CustomSelectPropsSchema = z.object({
    options: z.array(SelectOptionsPropsSchema),
    value: z.string(),
    onChange: z.function().args(z.any()).returns(z.void()),
});

export type SelectOptionsProps = z.infer<typeof SelectOptionsPropsSchema>;
export type CustomSelectProps = z.infer<typeof CustomSelectPropsSchema>;
