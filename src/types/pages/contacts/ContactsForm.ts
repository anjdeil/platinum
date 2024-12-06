import { z } from "zod";

export const ContactsFormValidationSchema = (
  t: (key: string, params?: Record<string, any>) => string
) =>
  z.object({
    email: z.string().email(t("email")),
    name: z.string().min(3, t("minChar", { count: 3 })),
    question: z.string().min(8, t("minChar", { count: 8 })),
  });

export const ContactsFormSchema = z.object({
  email: z.string().email("Please, type valid email"),
  name: z.string().min(3, "min 3 char"),
  question: z.string().min(8, "min 8 char"),
});

export type ContactsFormType = z.infer<typeof ContactsFormSchema>;
