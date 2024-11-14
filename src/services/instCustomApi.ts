import axios from "axios";
import { AuthInstConfigType } from "@/types/services";

const authConfig: AuthInstConfigType = {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
    userId: process.env.INSTAGRAM_USER_ID || '',
};

const instagramGraphApiBase = "https://graph.facebook.com/";

export class InstagramGraphApi {
    private readonly _apiBase: string;
    private readonly _authConfig: AuthInstConfigType;

    constructor(authConfig: AuthInstConfigType) {
        this._apiBase = instagramGraphApiBase;
        this._authConfig = authConfig;
    }

    private getAuthHeader(): string {
        const { accessToken } = this._authConfig;
        return `Bearer ${accessToken}`;
    }

    private validateAuthConfig() {
        if (!this._authConfig.accessToken || !this._authConfig.userId) {
            throw new Error('Access token or user ID is missing');
        }
    }

    async getResource() {
        this.validateAuthConfig();

        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${this._apiBase}v15.0/${this._authConfig.userId}/media`,
                    params: {
                        fields: 'caption,media_type,media_url,permalink,username',
                        access_token: this._authConfig.accessToken,
                        limit: 3,
                    },
                    headers: {
                        Authorization: this.getAuthHeader(),
                    },
                });

                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else if (response.status === 400) {
                    throw new Error(`Bad request: ${response.statusText}`);
                } else {
                    attempt++;
                }
            } catch (error) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw new Error(`Could not fetch media, received ${error}`);
                }
            }
        }

        throw new Error(`Failed to fetch media after ${maxRetries} attempts`);
    }

    async get() {
        const result = await this.getResource();
        return result;
    }
}

const instagramGraphApi = new InstagramGraphApi(authConfig);
export default instagramGraphApi;
