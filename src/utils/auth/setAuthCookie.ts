import { decodeJwt } from 'jose';
import { NextApiResponse } from 'next';

export function setAuthCookie(res: NextApiResponse, authToken: any) {
  if (typeof authToken !== 'string') return;
  const decodedToken = decodeJwt(authToken);

  if (!decodedToken || !decodedToken.exp) return;
  // const expiresDate = new Date(decodedToken.exp * 1000);
  const expiresDate = Math.floor(decodedToken.exp - Date.now() / 1000);
  const encodedToken = encodeURIComponent(authToken);

  const cookieHeader = `authToken=${encodedToken};  Path=/; Max-Age=${expiresDate}`;
  res.setHeader('Set-Cookie', cookieHeader);
}
