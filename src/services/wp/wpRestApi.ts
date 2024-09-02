import { authConfigType, wpParamsType } from "@/types/services/wp";
import axios from "axios";

const authConfig: authConfigType = {
    username: process.env.WP_USER || '',
    password: process.env.WP_PASSWORD || ''
};

export class WpRestApi
{
    private readonly _apiBase: string;
    private readonly _authConfig: authConfigType;

    constructor(authConfig: authConfigType)
    {
        this._apiBase = `${process.env.WP_URL}/wp-json/wp/v2/`;
        this._authConfig = authConfig;
    }

    private getBasicAuth(): string
    {
        const { username, password } = this._authConfig;
        const sanitizedPassword = password.replace(/\s+/g, '');
        const encodedAuth = Buffer.from(`${username}:${sanitizedPassword}`).toString('base64');
        return `Basic ${encodedAuth}`;
    }

    async getResource(url: string, params?: wpParamsType, authorization?: string | null)
    {
        const response = await axios.get(this._apiBase + url, {
            params: params,
            headers: {
                Authorization: authorization ? authorization : this.getBasicAuth()
            }
        })

        if (response.status !== 200)
        {
            throw new Error(`Could not fetch ${url}, received ${response.status}`)
        }

        return response;
    }

    async get(url: string, params?: wpParamsType, authorization?: string | null)
    {
        const result = await this.getResource(url, params, authorization);
        return result;
    }
}

const wpRestApi = new WpRestApi(authConfig);
export default wpRestApi;