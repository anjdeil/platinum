import { ParamsType, Method } from '@/types/services';
import axios from 'axios';

class CustomRestApi {
  private readonly _apiBase: string;
  constructor() {
    if (!process.env.REST_API) {
      throw new Error('REST_API environment variable is not defined');
    }
    this._apiBase = process.env.REST_API + '/';
  }

  async getResource(
    url: string,
    method: Method,
    params?: ParamsType,
    body?: object
  ) {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await axios({
          method: method,
          url: this._apiBase + url,
          params: params,
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
        attempt++;
        if (attempt >= maxRetries) {
          console.error('Error during request:', error);
          throw new Error(
            `Could not fetch ${this._apiBase + url}, received ${
              (error as Error).message
            }`
          );
        }
      }
    }

    throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
  }

  async get(url: string, params?: ParamsType) {
    return this.getResource(url, 'GET', params);
  }

  async post(url: string, body: object, params?: ParamsType) {
    return this.getResource(url, 'POST', params, body);
  }
}

export const customRestApi = new CustomRestApi();
export default CustomRestApi;
