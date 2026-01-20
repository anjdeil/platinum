// pages/api/log-order-error.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { error, orderPayload, extraInfo } = req.body;

        console.log('Order creation error:', JSON.stringify({ error, orderPayload, extraInfo }, null, 2));

        return res.status(200).json({ status: 'logged' });
    } catch (err) {
        console.error('Logging failed', err);
        return res.status(500).json({ status: 'failed', error: err });
    }
}
