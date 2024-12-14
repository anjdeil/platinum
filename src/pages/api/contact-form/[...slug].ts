import CF7RestApi from '@/services/contactForm7RestApi'
import { NextApiRequest, NextApiResponse } from 'next'
import { Buffer } from 'buffer' // Для работы с бинарными данными

const convertBase64ToBuffer = (base64Data: string) => {
  const [metadata, data] = base64Data.split(',')
  const mimeType = metadata.split(';')[0].split(':')[1]
  const buffer = Buffer.from(data, 'base64')

  return { buffer, mimeType }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let slug = req.query.slug

  if (!slug || slug.length === 0) {
    return res.status(400).json({ error: 'Slug parameter is missing' })
  }

  if (Array.isArray(slug)) {
    slug = slug.join('/')
  }

  const { file, ...formData } = req.body

  if (file) {
    const { buffer, mimeType } = convertBase64ToBuffer(file)
    const formDataWithFile = new FormData()
    formDataWithFile.append('_wpcf7_unit_tag', formData._wpcf7_unit_tag)
    formDataWithFile.append('firstName', formData.firstName)
    formDataWithFile.append('lastName', formData.lastName)
    formDataWithFile.append('email', formData.email)
    formDataWithFile.append('phone', formData.phone)
    formDataWithFile.append('country', formData.country)
    formDataWithFile.append('city', formData.city)
    formDataWithFile.append('about', formData.about)

    formDataWithFile.append(
      'file',
      new Blob([buffer], { type: mimeType }),
      'uploaded-file.png'
    )

    CF7RestApi.sendAnEmail(slug, formDataWithFile)
      .then((response) => res.status(200).json(response.data))
      .catch((error) => {
        console.log(error.message)
        return res.status(500).json(error.message)
      })
  } else {
    CF7RestApi.sendAnEmail(slug, formData)
      .then((response) => res.status(200).json(response.data))
      .catch((error) => {
        console.log(error.message)
        return res.status(500).json(error.message)
      })
  }
}
