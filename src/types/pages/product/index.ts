import { z } from "zod";

const NavigationButtonPropsSchema = z.object({
    prev: z.boolean().optional(),
    next: z.boolean().optional(),
});

export type NavigationButtonProps = z.infer<typeof NavigationButtonPropsSchema>;