"use client"

import { useState } from "react"
import useSWR from "swr"

import { Button } from "@/components/ui/button"

import SearchBar from "./SearchBar"

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
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [search, setSearch] = useState("")

  const { data, error, isLoading } = useSWR<QueryResult>(
    `/api/journeys?page=${page}`,
    fetcher,
    { revalidateOnFocus: false, revalidateIfStale: false } // Prevents revalidation once the data is cached (to avoid fetching for unchanged data)
  )

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  if (error) {
    console.log(error.message)
    return <div>An error has occurred while trying to load journeys</div>
  }
  if (isLoading) return <div>Loading...</div>

  if (data) {
    let { journeys, totalPages } = data

    if (search) {
      journeys = journeys.filter((journey) => {
        return (
          journey.departureStationName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          journey.returnStationName.toLowerCase().includes(search.toLowerCase())
        )
      })
    }

    const sortedJourneys = journeys.slice().sort((a, b) => {
      const aValue = a[sortColumn!]
      const bValue = b[sortColumn!]

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1

      return 0
    })

    return (
      <div className="mx-12 my-6">
        <SearchBar value={search} setValue={setSearch} />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("departureStationName")}
              >
                Departure station
                {sortColumn === "departureStationName" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("returnStationName")}
              >
                Return station
                {sortColumn === "returnStationName" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("coveredDistance")}
              >
                Covered distance (km)
                {sortColumn === "coveredDistance" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("duration")}
              >
                Duration (min)
                {sortColumn === "duration" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedJourneys.map((journey) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={journey._id}
              >
                <td className="px-6 py-4">{journey.departureStationName}</td>
                <td className="px-6 py-4">{journey.returnStationName}</td>
                <td className="px-6 py-4">
                  {(journey.coveredDistance / 1000).toFixed(2)}
                </td>
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
