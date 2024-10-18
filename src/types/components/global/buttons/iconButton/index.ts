import { ElementType } from "react";
import { z } from "zod";

const IconComponentPropsSchema = z.object({
    color: z.string().optional(),
    count: z.number().optional(),
});

const iconButtonPropsSchema = z.object({
    ...IconComponentPropsSchema.shape,
    IconComponent: z.custom<ElementType>().optional(),
    href: z.string().optional(),
    onClick: z.function().args(z.object({})).returns(z.void()).optional(),
});

export type IconComponentProps = z.infer<typeof IconComponentPropsSchema>;
export type IconButtonProps = z.infer<typeof iconButtonPropsSchema>;