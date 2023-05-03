import Link from "next/link"

import { Station } from "../types/station"

export default function StationsTable({ stations }: { stations: Station[] }) {
  return (
    <table className="mt-2 w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="cursor-pointer px-6 py-3">id</th>
          <th className="cursor-pointer px-6 py-3">Name</th>
          <th className="cursor-pointer px-6 py-3">Address</th>
          <th className="cursor-pointer px-6 py-3">City</th>
          <th className="cursor-pointer px-6 py-3">Bike capacity</th>
        </tr>
      </thead>
      <tbody>
        {stations?.map((station) => (
          <tr
            className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
            key={station._id}
          >
            <td className="px-6 py-4">{station.id}</td>
            <td className="px-6 py-4 hover:underline">
              <Link href={`/station/${station.id}`}>{station.name}</Link>
            </td>
            <td className="px-6 py-4">{station.osoite}</td>
            <td className="px-6 py-4">
              {station.kaupunki ? station.kaupunki : "Helsinki"}
            </td>
            <td className="px-6 py-4">{station.kapasiteet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
