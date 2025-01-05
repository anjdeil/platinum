import axios from 'axios';

class PasswordResetApi {
  private readonly _apiBase: string;

  constructor() {
    if (!process.env.WP_URL) {
      throw new Error('WP_URL is not defined in environment variables.');
    }
    this._apiBase = `${process.env.WP_URL}/wp-json/bdpwr/v1/`;
  }

  //  x-www-form-urlencoded
  private toFormUrlEncoded(body: Record<string, any>): string {
    return Object.entries(body)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
  }

  async post(url: string | string[], body?: Record<string, any>) {
    const fullUrl = Array.isArray(url) ? url.join('/') : url;

    try {
      const response = await axios({
        url: `${this._apiBase}${fullUrl}`,
        method: 'POST',
        data: body ? this.toFormUrlEncoded(body) : undefined,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status !== 200) {
        throw new Error(
          `Request to ${fullUrl} failed with status ${response.status}`
        );
      }

      return response;
    } catch (error: unknown) {
      console.error('Error in API call:', error);
      throw new Error(
        `Failed to perform API call to ${fullUrl}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
}

const passwordReset = new PasswordResetApi();
export default passwordReset;
