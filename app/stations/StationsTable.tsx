import Link from "next/link"

export default function StationsTable({ stations }: { stations: Station[] }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-6 py-3 cursor-pointer">id</th>
          <th className="px-6 py-3 cursor-pointer">Name</th>
          <th className="px-6 py-3 cursor-pointer">Address</th>
          <th className="px-6 py-3 cursor-pointer">City</th>
          <th className="px-6 py-3 cursor-pointer">Bike capacity</th>
        </tr>
      </thead>
      <tbody>
        {stations?.map((station) => (
          <tr
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
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
