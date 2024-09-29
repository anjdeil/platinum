import { z } from "zod";

const ThemeOptionsSchema = z.object({
    success: z.boolean(),
    data: z.object({
        item: z.object({
            loyalty_options: z.object({
                lang: z.object({
                    silver: z.string(),
                    gold: z.string(),
                    platinum: z.string(),
                })
            }

            ),
            contacts: z.object({
                schedule: z.array(
                    z.object({
                        _type: z.string(),
                        from_day: z.string(),
                        to_day: z.string(),
                        from_time: z.string(),
                        to_time: z.string(),
                        not_working: z.boolean(),
                    })
                ),
                socials: z.array(
                    z.object({
                        _type: z.string(),
                        social: z.string(),
                        link: z.string(),
                    })
                ),
                phone: z.string(),
                email: z.string(),
                address: z.string(),
            }),
            about_platinum:  z.object({
                lang:
                z.object({
                    subtitle: z.string(),
                    title: z.string(),
                    text: z.string(),
                })}),
        }),
    }),
});

export type ThemeOptionsType = z.infer<typeof ThemeOptionsSchema>;
