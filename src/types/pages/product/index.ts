import { CustomDataProductSchema } from "@/types/services";
import { z } from "zod";

const NavigationButtonPropsSchema = z.object({
    prev: z.boolean().optional(),
    next: z.boolean().optional(),
});

export const ProductPageSchema = z.object({
    res: CustomDataProductSchema
});

export type NavigationButtonProps = z.infer<typeof NavigationButtonPropsSchema>;
export type ProductPageType = z.infer<typeof ProductPageSchema>;