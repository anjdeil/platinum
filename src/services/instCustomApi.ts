import axios from "axios";
import { AuthInstConfigType, MediaResponse, MediaInfoResponse } from "@/types/services";

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

    async getMediaIds(): Promise<string[]> {
        this.validateAuthConfig();

        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const response = await axios.get<MediaResponse>(
                    `${this._apiBase}v21.0/${this._authConfig.userId}/media`,
                    {
                        params: {
                            access_token: this._authConfig.accessToken,
                            limit: 3,
                        },
                        headers: {
                            Authorization: this.getAuthHeader(),
                        },
                    }
                );

                if (response.status >= 200 && response.status < 300) {
                    return response.data.data.map((media) => media.id);
                } else if (response.status === 400) {
                    throw new Error(`Bad request: ${response.statusText}`);
                } else {
                    attempt++;
                }
            } catch (error) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw new Error(`Could not fetch media IDs, received ${error}`);
                }
            }
        }

        throw new Error(`Failed to fetch media IDs after ${maxRetries} attempts`);
    }

    async getMediaInfo(mediaIds: string[]): Promise<MediaInfoResponse[]> {
        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const promises = mediaIds.map(async (mediaId) => {
                    const response = await axios.get<MediaInfoResponse>(
                        `${this._apiBase}v21.0/${mediaId}`,
                        {
                            params: {
                                fields: 'caption,media_type,media_url,permalink,username',
                                access_token: this._authConfig.accessToken,
                            },
                            headers: {
                                Authorization: this.getAuthHeader(),
                            },
                        }
                    );

                    if (response.status >= 200 && response.status < 300) {
                        return response.data;
                    } else if (response.status === 400) {
                        throw new Error(`Bad request: ${response.statusText}`);
                    } else {
                        throw new Error(`Failed to fetch media info for ID ${mediaId}`);
                    }
                });

                const results = await Promise.all(promises);
                return results;
            } catch (error) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw new Error(`Could not fetch media info, received ${error}`);
                }
            }
        }

        throw new Error(`Failed to fetch media info after ${maxRetries} attempts`);
    }

    async get(): Promise<MediaInfoResponse[]> {
        const mediaIds = await this.getMediaIds();
        const mediaInfo = await this.getMediaInfo(mediaIds);
        return mediaInfo;
    }
}

const instagramGraphApi = new InstagramGraphApi(authConfig);
export default instagramGraphApi;
