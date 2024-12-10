import { z } from "zod";

const ContactIconPropsSchema = z.object({
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  fill: z.string().optional(),
});

export type ContactIconProps = z.infer<typeof ContactIconPropsSchema>;
