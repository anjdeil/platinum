import { z } from "zod";

const iconButtonPropsSchema = z.object({
    color: z.string().optional(),
    count: z.number().optional(),
});

export type IconButtonProps = z.infer<typeof iconButtonPropsSchema>;