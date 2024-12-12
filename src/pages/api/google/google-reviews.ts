import { validateApiError } from '@/utils/validateApiError';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface GooglePlaceDetailsResponse {
  result: {
    reviews: any[];
  };
}

const GOOGLE_API_URL =
  'https://maps.googleapis.com/maps/api/place/details/json';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(GOOGLE_API_URL, {
      params: {
        key: process.env.GOOGLE_PLACES_API_KEY,
        place_id: process.env.GOOGLE_PLACE_ID,
        language: 'pl',
        fields: 'reviews',
      },
    });

    const reviews =
      (response.data as GooglePlaceDetailsResponse).result.reviews || [];
    res.status(200).json(reviews);
  } catch (error) {
    validateApiError(error, res);
  }
}
