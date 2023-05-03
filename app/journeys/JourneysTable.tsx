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
    <table className="mt-2 w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th
            scope="col"
            className="cursor-pointer px-6 py-3"
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
            className="cursor-pointer px-6 py-3"
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
            className="cursor-pointer px-6 py-3"
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
            className="cursor-pointer px-6 py-3"
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
            className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
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
