import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { page } = Array.isArray(req.query.page)
        ? req.query.page[0]
        : req.query

      const resultsPerPage = 20

      const client = await clientPromise
      const db = client.db("solita")

      const journeys = await db
        .collection("journeys")
        .find({})
        .skip((parseInt(page) - 1) * resultsPerPage)
        .limit(resultsPerPage)
        .toArray()

      const documentCount = await db.collection("journeys").countDocuments()
      const totalPages = Math.ceil(documentCount / resultsPerPage)

      res.status(200).json({ journeys, totalPages })
    } catch (error) {
      console.log(error)
      res
        .status(400)
        .json({ message: "An error has occurred while fetching the journeys" })
    }
  }
}
