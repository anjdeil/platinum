import { z } from "zod";

export const CommentFormSchema = z.object({
    comment: z.string().min(5)
});

export type CommentFormType = z.infer<typeof CommentFormSchema>;