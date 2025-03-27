import { decodeJwt } from 'jose';
import { NextApiResponse } from 'next';

export function setAuthCookie(
  res: NextApiResponse,
  authToken: any,
  rememberMe?: boolean
) {
  if (typeof authToken !== 'string') return;

  const decodedToken = decodeJwt(authToken);

  if (!decodedToken || !decodedToken.exp) return;

  let expiresDate: number;

  if (rememberMe === undefined || rememberMe) {
    // 7 days
    expiresDate = Math.max(0, decodedToken.exp - Math.floor(Date.now() / 1000));
  } else {
    // session cookie
    expiresDate = 0;
  }

  const encodedToken = encodeURIComponent(authToken);

  const cookieHeader = `authToken=${encodedToken}; Path=/; ${
    expiresDate === 0 ? '' : `Max-Age=${expiresDate}`
  }; Secure`;

  res.setHeader('Set-Cookie', cookieHeader);
}
