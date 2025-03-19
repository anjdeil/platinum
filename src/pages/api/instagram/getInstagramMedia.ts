import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AuthInstConfigType, MediaInfoResponse } from '@/types/services';
import { customRestApi } from '@/services/wpCustomApi';

interface InstagramApiResponse {
  data: MediaInfoResponse[];
}

const validateAuthConfig = (authConfig: AuthInstConfigType) => {
  if (!authConfig.accessToken || !authConfig.userId) {
    throw new Error('Access token or user ID is missing');
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const AUTHORIZATION_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
    if (!AUTHORIZATION_TOKEN) throw new Error('Invalid response token');

    const response = await customRestApi.get('instagram/account', undefined, {
      Authorization: AUTHORIZATION_TOKEN,
    });

    if (!response.data || !response.data.data) {
      throw new Error('Invalid response from Instagram API');
    }

    const authConfig = {
      accessToken: response.data.data.access_token,
      userId: response.data.data.account_id,
    };

    validateAuthConfig(authConfig);

    const apiBase = `https://graph.instagram.com/${authConfig.userId}/media`;

    const LIMIT_POSTS = 3;
    const params = {
      fields:
        'id,username,media,caption,media_url,media_type,permalink,timestamp,thumbnail_url',
      access_token: authConfig.accessToken,
      limit: LIMIT_POSTS,
    };

    const mediaResponse = await axios.get<InstagramApiResponse>(apiBase, {
      params,
    });

    if (!mediaResponse.data || !mediaResponse.data.data) {
      throw new Error('Invalid response from Instagram media API');
    }

    res.status(200).json(mediaResponse.data.data);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    res.status(500).json({ error: 'Error fetching Instagram posts' });
  }
}
