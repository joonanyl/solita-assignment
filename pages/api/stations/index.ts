import { NextApiRequest, NextApiResponse } from "next"

import clientPromise from "@/lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const id = req.query
    } catch (error) {
      console.log(error)
    }
  }
}
