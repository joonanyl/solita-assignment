"use client"

import { useState } from "react"
import useSWR from "swr"

import { Button } from "@/components/ui/button"

type Journey = {
  _id: string
  coveredDistance: number
  departure: string
  departureStationId: number
  departureStationName: string
  duration: number
  return: string
  returnStationId: number
  returnStationName: string
}

type QueryResult = {
  journeys: Journey[]
  totalPages: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function JourneysPage() {
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useSWR<QueryResult>(
    `/api/journeys?page=${page}`,
    fetcher,
    { revalidateOnFocus: false, revalidateIfStale: false } // Prevents revalidation once the data is cached
  )

  if (error) {
    console.log(error.message)
    return <div>An error has occurred while trying to load journeys</div>
  }
  if (isLoading) return <div>Loading...</div>

  if (data) {
    const { journeys, totalPages } = data

    return (
      <div className="mx-12 my-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Departure station
              </th>
              <th scope="col" className="px-6 py-3">
                Return station
              </th>
              <th scope="col" className="px-6 py-3">
                Covered distance (km)
              </th>
              <th scope="col" className="px-6 py-3">
                Duration (min)
              </th>
            </tr>
          </thead>
          <tbody>
            {journeys.map((journey) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={journey._id}
              >
                <td className="px-6 py-4">{journey.departureStationName}</td>
                <td className="px-6 py-4">{journey.returnStationName}</td>
                <td className="px-6 py-4">{journey.coveredDistance / 1000}</td>
                <td className="px-6 py-4">
                  {Math.round(journey.duration / 60)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="font-bold text-center mt-4">
          {page} / {totalPages}
        </p>
        <div className="flex gap-4 my-4 justify-center">
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </Button>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }
}
