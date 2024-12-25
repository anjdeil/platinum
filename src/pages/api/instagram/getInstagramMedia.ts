import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AuthInstConfigType, MediaInfoResponse } from '@/types/services';

interface InstagramApiResponse {
  data: MediaInfoResponse[];
}

const authConfig: AuthInstConfigType = {
  accessToken: process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN || '',
  userId: process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID || '',
};

const LIMIT_POSTS = 3;

const validateAuthConfig = (authConfig: AuthInstConfigType) => {
  if (!authConfig.accessToken || !authConfig.userId) {
    throw new Error('Access token or user ID is missing');
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  validateAuthConfig(authConfig);

  const apiBase = `https://graph.instagram.com/${authConfig.userId}/media`;
  const params = {
    fields:
      'id,username,media,caption,media_url,media_type,permalink,timestamp,thumbnail_url',
    access_token: authConfig.accessToken,
    limit: LIMIT_POSTS,
  };
  try {
    const response = await axios.get<InstagramApiResponse>(apiBase, { params });

    const media = response.data.data;

    res.status(200).json(media);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    res.status(500).json({ error: 'Error fetching Instagram posts' });
  }
}
