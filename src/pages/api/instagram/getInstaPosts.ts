import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}

interface InstagramApiResponse {
  data: InstagramPost[];
}

const INSTAGRAM_ACCESS_TOKEN =
  "EAAVqBm6bqrMBO9LO8lKTdMIEIOs22an0BjnxY7iF7ENGvWZApGvEyAZCZBJbkZAe4Ogq9VtKL4dRYTGlUWng94w92SYUbKOk5fSeVWZAoHTrx40wQKfKaULcAbO7KKiVoLuYfplO0BwCE5PciN0POViVAV8JJJV3BZC9lFqQH7FoRYiLqTq";
const INSTAGRAM_USER_ID = "522900064237255";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get<InstagramApiResponse>(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );

    const posts = response.data.data.map((item: any) => ({
      id: item.id,
      caption: item.caption,
      media_url: item.media_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    res.status(500).json({ error: "Error fetching Instagram posts" });
  }
}
