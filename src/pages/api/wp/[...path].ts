import wpRestApi from "@/services/wpRestApi";
import { validateApiError } from "@/utils/validateApiError";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { ...params } = req.query;
    let slug = req.query.path;

    if (!slug || slug.length === 0)
        return res.status(400).json({ error: 'Slug parameter is missing' });

    if (Array.isArray(slug))
        slug = slug.join('/');

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
                response = await wpRestApi.get(slug, params, body);
                break;
            default:
                res.setHeader('Allow', ['POST', 'GET']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }

        if (response && response.data)
            return res.status(200).json(response?.data);

    } catch (error)
    {
        validateApiError(error, res);
    }
}