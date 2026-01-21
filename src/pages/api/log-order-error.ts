import { Redis } from '@upstash/redis';
import type { NextApiRequest, NextApiResponse } from 'next';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const isLoggingEnabled = process.env.NEXT_PUBLIC_ORDER_LOGS === 'true';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!isLoggingEnabled) {
        return res.status(200).json({ status: 'logging_disabled' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { error, orderPayload, extraInfo } = req.body;

        console.log('Order creation error:', JSON.stringify({ error, orderPayload, extraInfo }, null, 2));

        const filteredPayload = {
            ...orderPayload,
            billing: { ...orderPayload.billing, email: undefined, phone: undefined },
            shipping: { ...orderPayload.shipping, email: undefined, phone: undefined },
        };

        const logEntry = {
            timestamp: new Date().toISOString(),
            error: error?.message || JSON.stringify(error),
            orderPayload: filteredPayload,
            extraInfo,
        };

        const logKey = `order_log_${Date.now()}`;
        await redis.set(logKey, JSON.stringify(logEntry));

        return res.status(200).json({ status: 'logged' });
    } catch (err) {
        console.error('Logging failed', err);
        return res.status(500).json({ status: 'failed', error: err });
    }
}
