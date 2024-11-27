import { z } from "zod";

export const ContactsFormSchema = z.object({
  email: z.string().email("Please, type valid email"),
  name: z.string().min(3, "min 3 char"),
  question: z.string().min(8, "min 8 char"),
});

export type ContactsFormType = z.infer<typeof ContactsFormSchema>;
