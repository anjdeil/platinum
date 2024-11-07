import { z } from "zod";

export const AttributeSchema = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    options: z.array(z.object({
        id: z.number(),
        slug: z.string(),
        name: z.string(),
    }))
})

export type AttributeType = z.infer<typeof AttributeSchema>;