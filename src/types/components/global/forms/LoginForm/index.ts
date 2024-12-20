import { z } from "zod";

export const LoginFormSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8)
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;