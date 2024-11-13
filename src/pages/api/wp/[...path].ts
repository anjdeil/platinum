import wpRestApi from "@/services/wpRestApi";
import { validateApiError } from "@/utils/validateApiError";
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

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

        if (response && response.data)
        {
            if ('token' in response.data)
            {
                res.cookie('authToken', response.data.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    sameSite: 'strict', // Adjust as needed
                    maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time (e.g., 1 day)
                });
            }

            return res.status(200).json(response?.data);
        }


    } catch (error)
    {
        validateApiError(error, res);
    }
}