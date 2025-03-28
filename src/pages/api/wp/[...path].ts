import wpRestApi from '@/services/wpRestApi';
import { getCookieValue } from '@/utils/auth/getCookieValue';
import { setAuthCookie } from '@/utils/auth/setAuthCookie';
import { validateApiError } from '@/utils/validateApiError';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ...params } = req.query;
  let slug = req.query.path;
  let v2: boolean = true;

  if (!slug || slug.length === 0) {
    return res.status(400).json({ error: 'Slug parameter is missing' });
  }

  if (Array.isArray(slug)) slug = slug.join('/');

  if (slug.includes('jwt-auth')) v2 = false;

  const { method, body, headers } = req;
  let authorization = null;
  let response;

  const rememberMe = req.body.rememberMe;

  if (slug.includes('token/validate') || slug.includes('users')) {
    const authToken = getCookieValue(headers.cookie || '', 'authToken');

    if (authToken) {
      authorization = `Bearer ${authToken}`;
    } else {
      console.log('Error: No auth token found in cookies');
    }
  }

  try {
    switch (method) {
      case 'GET':
        response = await wpRestApi.get(slug, params, authorization);
        break;
      case 'POST':
        response = await wpRestApi.post(
          slug,
          { ...body, rememberMe },
          !v2 && v2,
          authorization
        );
        break;
      case 'PUT':
        response = await wpRestApi.put(slug, body, authorization);
        break;
      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    if (response && response.data) {
      if ('token' in response.data) {
        setAuthCookie(res, response.data.token, rememberMe);
      }

      return res.status(200).json(response?.data);
    }
  } catch (error) {
    console.log('Error occurred during API request:', error);
    validateApiError(error, res);
  }
}
