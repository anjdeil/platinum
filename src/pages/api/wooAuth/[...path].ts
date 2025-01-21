import wooCommerceRestApi from '@/services/wooCommerceRestApi';
import wpRestApi from '@/services/wpRestApi';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';
import { getCookieValue } from '@/utils/auth/getCookieValue';
import { validateApiError } from '@/utils/validateApiError';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path, ...params } = req.query;

  if (!path?.length)
    return res
      .status(400)
      .json({ error: 'Failed to fetch, because slug is missing!' });

  let slug = typeof path === 'string' ? path : path.join('/');

  const { method, body, headers } = req;

  /**
   * Check if client has the token
   * Validate the token
   * Get customer id from the token
   */
  const authToken = getCookieValue(headers.cookie || '', 'authToken');

  if (!authToken) {
    return res.status(401).json({ error: 'Missing authentication token' });
  }

  try {
    await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${authToken}`
    );

    const payload = decodeJwt(authToken) as JwtDecodedDataType;
    const isPayloadValid = await validateJwtDecode(payload);

    if (!isPayloadValid) {
      return res
        .status(401)
        .json({ error: 'Invalid authentication token payload' });
    }

    const customerId = payload.data.user.id;
    slug += `/${customerId}`;

    // Лог для проверки значения slug
    console.log('Slug with customer ID:', slug); // Добавляем лог с слагом
  } catch (err) {
    console.log('Error during token validation:', err);
    return res
      .status(401)
      .json({ error: 'Invalid or missing authentication token' });
  }

  // Лог для проверки полного URL запроса
  console.log('Final URL for request:', slug); // Логируем финальный URL перед отправкой запроса

  if (method !== 'GET')
    await fetchData(method, body, headers as Record<string, string>);
  else await fetchData(method);

  async function fetchData(
    method: string = 'GET',
    body?: unknown,
    headers?: Record<string, string>
  ) {
    const maxRetries = 3;
    let attempt = 0;
    let response;

    while (attempt < maxRetries) {
      try {
        switch (method) {
          case 'POST':
            response = await wooCommerceRestApi.post(slug, body);
            break;
          case 'PUT':
            // Логируем URL и тело запроса для PUT
            console.log('Sending PUT request to:', slug);
            console.log('Request body:', body); // Логируем тело запроса
            response = await wooCommerceRestApi.put(slug, body);
            break;
          case 'DELETE':
            response = await wooCommerceRestApi.delete(slug, headers);
            break;
          case 'GET':
            response = await wooCommerceRestApi.get(slug, params);
            break;
          default:
            console.error(`Default case with method ${method}`);
            res.setHeader('Allow', ['POST', 'PUT', 'DELETE', 'GET']);
            return res.status(405).end(`Method ${method} Not Allowed`);
        }

        if (response.status !== 400) {
          return res.status(200).json(response.data);
        } else {
          throw new Error(`Bad request: ${response.statusText}`);
        }
      } catch (error) {
        attempt++;
        if (attempt >= maxRetries) {
          validateApiError(error, res);
          break;
        }
      }
    }
  }
}
