import { z } from 'zod';

const badgeProps = z.object({
    count: z.number().optional(),
});

export type BadgeProps = z.infer<typeof badgeProps>;