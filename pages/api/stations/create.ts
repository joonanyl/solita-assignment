import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const station = req.body

      const client = await clientPromise
      const db = client.db("solita")

      const response = db.collection("stations").insertOne(station)
      console.log(response)

      res.status(201).json(station)
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: "An error has occurred while trying to create a new station",
      })
    }
  }
}
