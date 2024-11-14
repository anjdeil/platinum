import wpRestApi from "@/services/wpRestApi";
import { validateApiError } from "@/utils/validateApiError";
import { NextApiRequest, NextApiResponse } from 'next';
import { decodeJwt } from 'jose';

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { ...params } = req.query;
    let slug = req.query.path;
    let v2: boolean = true;

    if (!slug || slug.length === 0)
        return res.status(400).json({ error: 'Slug parameter is missing' });

    if (Array.isArray(slug))
        slug = slug.join('/');

    if (slug.includes('jwt-auth'))
        v2 = false;


    const { method, body, headers } = req;
    const authorization = "authorization" in headers ? headers.authorization : null;
    let response;

    try
    {
        switch (method)
        {
            case 'GET':
                response = await wpRestApi.get(slug, params, authorization);
                break;
            case 'POST':
                response = await wpRestApi.post(slug, body, (!v2 && v2));
                break;
            default:
                res.setHeader('Allow', ['POST', 'GET']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }

        function setAuthCookie(res: NextApiResponse, authToken: any)
        {
            if (typeof authToken !== 'string') return;
            const decodedToken = decodeJwt(authToken);

            if (!decodedToken || !decodedToken.exp) return;
            const expiresDate = new Date(decodedToken.exp * 1000);

            console.log('authToken', authToken);
            const encodedToken = encodeURIComponent(authToken);

            const cookieHeader = `authToken=${encodedToken}; 
            HttpOnly; 
            Secure; 
            SameSite=Strict; 
            Path=/; 
            Max-Age=${24 * 60 * 60}`;
            res.setHeader('Set-Cookie', cookieHeader);


            // res.setHeader('Set-Cookie',
            //     `authToken=${key}; 
            //         HttpOnly; 
            //         Secure; 
            //         SameSite=Strict; 
            //         Path=/; 
            //         Max-Age=${expiresDate}`);
        }

        if (response && response.data)
        {
            if ('token' in response.data)
            {
                setAuthCookie(res, response.data.token)
            }
            return res.status(200).json(response?.data);
        }


    } catch (error)
    {
        validateApiError(error, res);
    }
}