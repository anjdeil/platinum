import instagramGraphApi from "@/services/instCustomApi";
import { validateApiError } from "@/utils/validateApiError";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let response;
    try {
        response = await instagramGraphApi.get();
        res.status(200).json(response.data);
    } catch (error) {
        validateApiError(error, res);
    }
}
