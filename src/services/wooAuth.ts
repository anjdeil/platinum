import wpRestApi from '@/services/wpRestApi';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';

import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { decodeJwt } from 'jose';
import wooCommerceRestApi from './wooCommerceRestApi';

export async function fetchAuthData(
  path: string,
  authToken: string,
  params: Record<string, any>
) {
  if (!authToken) {
    throw new Error('Missing authentication token');
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
      throw new Error('Invalid authentication token payload');
    }

    const customerId = payload.data.user.id;
    path += `/${customerId}`;

    const response = await wooCommerceRestApi.get(path, params);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error('Invalid or missing authentication token');
  }
}
