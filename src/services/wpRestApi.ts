import { Method, ParamsType } from '@/types/services';
import { AuthConfigType } from '@/types/services/wpRestApi/auth';
import axios from 'axios';

const authConfig: AuthConfigType = {
  username: process.env.WP_USER || '',
  password: process.env.WP_PASSWORD || '',
};

const wpV2 = 'wp/v2/';

export class WpRestApi {
  private readonly _apiBase: string;
  private readonly _authConfig: AuthConfigType;

  constructor(authConfig: AuthConfigType) {
    this._apiBase = `${process.env.WP_URL}/wp-json/`;
    this._authConfig = authConfig;
  }

  private getBasicAuth(): string {
    const { username, password } = this._authConfig;
    const encodedAuth = Buffer.from(`${username}:${password}`).toString(
      'base64'
    );
    return `Basic ${encodedAuth}`;
  }

  async getResource(
    url: string,
    method: Method,
    params?: ParamsType,
    authorization?: string | null,
    body?: object,
    v2: boolean = true
  ) {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await axios({
          method: method,
          url: this._apiBase + (v2 !== false ? wpV2 : '') + url,
          params: params,
          headers: {
            Authorization: authorization ? authorization : this.getBasicAuth(),
          },
          data: body,
        });

        if (response.status >= 200 && response.status < 300) {
          return response;
        } else if (response.status === 400) {
          throw new Error(`Bad request: ${response.statusText}`);
        } else {
          attempt++;
        }
      } catch (error) {
        console.log('result', error);
        attempt++;
        if (attempt >= maxRetries) {
          throw new Error(`Could not fetch ${url}, received ${error}`);
        }
      }
    }

    throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
  }

  async get(url: string, params?: ParamsType, authorization?: string | null) {
    const result = await this.getResource(url, 'GET', params, authorization);
    return result;
  }

  async post(
    url: string,
    body: object,
    v2?: boolean,
    authorization?: string | null
  ) {
    const result = await this.getResource(
      url,
      'POST',
      {},
      authorization,
      body,
      v2
    );
    return result;
  }
  async put(
    url: string,
    body: object,
    authorization?: string | null,
    v2?: boolean
  ) {
    const result = await this.getResource(
      url,
      'PUT',
      {},
      authorization,
      body,
      v2
    );

    return result;
  }
}

const wpRestApi = new WpRestApi(authConfig);
export default wpRestApi;
