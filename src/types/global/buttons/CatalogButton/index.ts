import { z } from "zod";

const StyledCatalogButtonPropsSchema = z.object({
    strokeColor: z.string().optional(),
});

export type StyledCatalogButtonProps = z.infer<typeof StyledCatalogButtonPropsSchema>;