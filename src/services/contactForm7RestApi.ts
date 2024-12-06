import axios from "axios";

/* interface ContactFormData {
  _wpcf7_unit_tag: string;
  "your-name": string;
  "your-email": string;
  "your-message": string;
}
 */
export class ContactsForm7RestApi {
  private readonly _apiBase: string;

  /*  constructor(apiBase: string) {
    this._apiBase = apiBase;
  } */
  constructor() {
    this._apiBase =
      "https://platinum.digiway-dev.online/wp-json/contact-form-7/v1/contact-forms/";
  }
  async sendAnEmail(url: string, body: object) {
    try {
      const response = await axios.post(this._apiBase + url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error(`Error in request: ${url}. Status: ${response.status}`);
      }

      return response;
    } catch (error: unknown) {
      throw new Error(
        `Failed to send email: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
const CF7RestApi = new ContactsForm7RestApi();
export default CF7RestApi;
