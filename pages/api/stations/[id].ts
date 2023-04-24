import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id

      if (id) {
        const client = await clientPromise
        const db = client.db("solita")

        const station = await db
          .collection("stations")
          .findOne({ id: parseInt(id) })

        const startingJourneys = await db
          .collection("journeys")
          .find({ departureStationId: parseInt(id) })
          .toArray()

        const endingJourneys = await db
          .collection("journeys")
          .find({ returnStationId: parseInt(id) })
          .toArray()

        res.status(200).json({ station, startingJourneys, endingJourneys })
      } else {
        res.status(400).json({ message: "Id is missing!" })
      }
    } catch (error) {
      console.log(error)
      res
        .status(400)
        .json({ message: "An error has occurred while fetching the stations" })
    }
  }
}
