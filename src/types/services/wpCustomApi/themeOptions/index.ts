import { z } from "zod";

const languageImageSchema = z.object({
  desktop: z.string(),
  mobile: z.string(),
});

export const ThemeOptionsItemSchema = z.object({
  loyalty_options: z.record(
    z.object({
      silver: z.string(),
      gold: z.string(),
      platinum: z.string(),
    })
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
  banners: z.array(
    z.object({
      _type: z.string(),
      title: z.string(),
      url: z.string(),
      delay: z.number(),
      images: z.record(z.string(), languageImageSchema),
    })
  ),
  about_platinum: z.record(
    z.object({
      subtitle: z.string(),
      title: z.string(),
      text: z.string(),
    })
  ),
});

export type ThemeOptionsItemType = z.infer<typeof ThemeOptionsItemSchema>;