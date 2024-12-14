import axios from 'axios'

export class ContactsForm7RestApi {
  private readonly _apiBase: string

  constructor() {
    this._apiBase =
      'https://platinum.digiway-dev.online/wp-json/contact-form-7/v1/contact-forms/'
  }

  async sendAnEmail(url: string, body: object) {
    console.log('Sending email request to URL:', this._apiBase + url)
    console.log('Request body:', body)

    try {
      const response = await axios.post(this._apiBase + url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Response received:', response)

      if (response.status !== 200) {
        throw new Error(`Error in request: ${url}. Status: ${response.status}`)
      }
      // @ts-ignore
      if (response.data?.status === 'validation_failed') {
        throw new Error(
          // @ts-ignore
          `Validation failed in request: ${url}. Status: ${response.data.status}`
        )
      }

      return response
    } catch (error: unknown) {
      console.error('Error occurred while sending email:', error)

      // Бросаем ошибку с более подробным сообщением
      throw new Error(
        `Failed to send email: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }
}

const CF7RestApi = new ContactsForm7RestApi()
export default CF7RestApi
