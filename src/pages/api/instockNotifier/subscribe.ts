import { ProductNotifierReqDataSchema } from '@/types/store/rtk-queries/instockNotifier';
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const INSTOCK_NOTIFIER_URL = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/v1/instock-subscribe`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  console.log('body', body);

  const validationResult = ProductNotifierReqDataSchema.safeParse(body);

  if (!validationResult.success) {
    return res.status(400).json({ error: 'Parameters is missing' });
  }

  try {
    const response = await axios.post(INSTOCK_NOTIFIER_URL, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error during subscription:', (error as any).message);

    if (error instanceof AxiosError && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
