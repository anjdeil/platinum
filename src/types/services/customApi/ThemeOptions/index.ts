import { z } from "zod";

const ThemeOptionsSchema = z.object({
    success: z.boolean(),
    data: z.object({
        item: z.object({
            loyalty_options: 
            z.record(
                z.object({
                  silver: z.string(),
                  gold: z.string(),
                  platinum: z.string(),
                })
              ),
              /* z.object({
                lang: z.object({
                    silver: z.string(),
                    gold: z.string(),
                    platinum: z.string(),
                })
            }
            ), */
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
            about_platinum: z.record(
                z.object({
                    subtitle: z.string(),
                    title: z.string(),
                    text: z.string(),
                })
              ),/*  z.object({
                lang:
                z.object({
                    subtitle: z.string(),
                    title: z.string(),
                    text: z.string(),
                })}), */
        }),
    }),
});

/* const ThemeOptionsSchema = z.object({
    success: z.boolean(),
    data: z.object({
      item: z.object({
        loyalty_options: z.object({
          en: z.object({
            silver: z.string(),
            gold: z.string(),
            platinum: z.string(),
          }),
          pl: z.object({
            silver: z.string(),
            gold: z.string(),
            platinum: z.string(),
          }),
          de: z.object({
            silver: z.string(),
            gold: z.string(),
            platinum: z.string(),
          }),
          ru: z.object({
            silver: z.string(),
            gold: z.string(),
            platinum: z.string(),
          }),
          uk: z.object({
            silver: z.string(),
            gold: z.string(),
            platinum: z.string(),
          }),
        }),
        contacts: z.object({
          // ...
        }),
        about_platinum: z.object({
          en: z.object({
            subtitle: z.string(),
            title: z.string(),
            text: z.string(),
          }),
          pl: z.object({
            subtitle: z.string(),
            title: z.string(),
            text: z.string(),
          }),
          de: z.object({
            subtitle: z.string(),
            title: z.string(),
            text: z.string(),
          }),
          ru: z.object({
            subtitle: z.string(),
            title: z.string(),
            text: z.string(),
          }),
          uk: z.object({
            subtitle: z.string(),
            title: z.string(),
            text: z.string(),
          }),
        }),
      }),
    }),
  });
   */
export type ThemeOptionsType = z.infer<typeof ThemeOptionsSchema>;
