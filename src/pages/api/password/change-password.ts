import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const CHANGE_PASSWORD_URL = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/platinum/v1/change-password`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');

  const { user_id, password } = req.body;

  if (!token || !password || !user_id) {
    return res.status(400).json({ message: 'Missing token or password' });
  }

  try {
    const wpRes = await axios.post(
      CHANGE_PASSWORD_URL,
      { user_id, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json(wpRes.data);
  } catch (error: any) {
    console.error(error);
    return res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data?.message || 'Server error' });
  }
}
