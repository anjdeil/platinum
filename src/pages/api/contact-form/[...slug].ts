import CF7RestApi from "@/services/contactForm7RestApi";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let slug = req.query.slug;

  if (!slug || slug.length === 0) {
    return res.status(400).json({ error: "Slug parameter is missing" });
  }

  if (Array.isArray(slug)) {
    slug = slug.join("/");
  }

  console.log(slug);
  console.log(req.body);

  CF7RestApi.sendAnEmail(slug, req.body)
    .then((response) => res.status(200).json(response.data))
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json(error.message);
    });
}
