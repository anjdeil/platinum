import { z } from "zod";

export const CustomFormCheckboxSchema = z.object({
    label: z.string().optional(),
    name: z.string(),
    register: z.any(),
    errors: z.any()
})

export type CustomFormCheckboxType = z.infer<typeof CustomFormCheckboxSchema>;