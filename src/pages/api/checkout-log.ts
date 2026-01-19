import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const body = req.body;
            console.log('Checkout log:', body);
            return res.status(200).json({ ok: true });
        } catch (e) {
            console.error('Failed to log checkout:', e);
            return res.status(500).json({ ok: false });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
