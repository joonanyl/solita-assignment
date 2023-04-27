import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb"

interface QueryStrings {
  id?: string
  month?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id, month } = req.query as QueryStrings

      console.log(month)

      if (id) {
        const client = await clientPromise
        const db = client.db("solita")

        let query: { [key: string]: any } = {
          departureStationId: parseInt(id),
        }

        if (month) {
          if (month !== "null") {
            query.departure = {
              $gt: `2021-${month}-01`,
              $lt: `2021-0${parseInt(month) + 1}-01`,
            }
          }
        }

        console.log(query)

        const station = await db
          .collection("stations")
          .findOne({ id: parseInt(id) })

        const startingJourneys = await db
          .collection("journeys")
          .find(query)
          .toArray()

        query = {
          returnStationId: parseInt(id), // Change the query object for endingJourneys
        }

        if (month) {
          if (month !== "null") {
            query.return = {
              $gt: `2021-${month}-01`,
              $lt: `2021-0${parseInt(month) + 1}-01`,
            }
          }
        }

        const endingJourneys = await db
          .collection("journeys")
          .find(query)
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
