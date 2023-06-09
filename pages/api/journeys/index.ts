import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb"

interface QueryStrings {
  page?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { page } = req.query as QueryStrings

      if (!page) {
        return res.status(400).json({ message: "Page query string missing" })
      }

      const RESULTSPERPAGE = 20

      const client = await clientPromise
      const db = client.db("solita")

      const journeys = await db
        .collection("journeys")
        .find({})
        .skip((parseInt(page) - 1) * RESULTSPERPAGE)
        .limit(RESULTSPERPAGE)
        .toArray()

      const documentCount = await db.collection("journeys").countDocuments()
      const totalPages = Math.ceil(documentCount / RESULTSPERPAGE)

      res.status(200).json({ journeys, totalPages })
    } catch (error) {
      res
        .status(400)
        .json({ message: "An error has occurred while fetching the journeys" })
    }
  }
}
