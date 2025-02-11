import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const MAIL_POET_URL = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/v1/unsubscribe`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!body.email) {
    return res.status(400).json({ error: 'Email parameter is missing' });
  }

  try {
    const response = await axios.post(MAIL_POET_URL, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error during subscription:', (error as any).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
