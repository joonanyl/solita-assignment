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

      const resultsPerPage = 20

      const client = await clientPromise
      const db = client.db("solita")

      if (!page) {
        return res.status(400).json({ message: "Page query string missing" })
      }

      const stations = await db
        .collection("stations")
        .find({})
        .skip((parseInt(page) - 1) * resultsPerPage)
        .limit(resultsPerPage)
        .toArray()

      const documentCount = await db.collection("stations").countDocuments()
      const totalPages = Math.ceil(documentCount / resultsPerPage)

      res.status(200).json({ stations, totalPages })
    } catch (error) {
      console.log(error)
      res
        .status(400)
        .json({ message: "An error has occurred while fetching the stations" })
    }
  }
}
