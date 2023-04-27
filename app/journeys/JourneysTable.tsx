import { useState } from "react"

export default function JourneysTable({ journeys }: { journeys: Journey[] }) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedJourneys = journeys.slice().sort((a, b) => {
    const aValue = a[sortColumn!]
    const bValue = b[sortColumn!]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1

    return 0
  })

  return (
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
            <td className="px-6 py-4">{Math.round(journey.duration / 60)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
