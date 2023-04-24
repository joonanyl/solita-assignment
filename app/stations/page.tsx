"use client"

import { useState } from "react"
import useSWR from "swr"

import { Button } from "@/components/ui/button"

import SearchBar from "../journeys/SearchBar"

type QueryResult = {
  stations: Station[]
  totalPages: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function StationsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const { data, error, isLoading } = useSWR<QueryResult>(
    `/api/stations?page=${page}`,
    fetcher,
    { revalidateOnFocus: false, revalidateIfStale: false } // Prevents revalidation once the data is cached
  )

  if (error) {
    console.log(error.message)
    return <div>An error has occurred while trying to load journeys</div>
  }
  if (isLoading) return <div>Loading...</div>

  if (data) {
    let { stations, totalPages } = data

    if (search) {
      stations = stations.filter((station) => {
        return (
          station.name.toLowerCase().includes(search.toLowerCase()) ||
          station.osoite.toLowerCase().includes(search.toLowerCase())
        )
      })
    }

    return (
      <div className="mx-12 my-6">
        <SearchBar value={search} setValue={setSearch} />
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
                <td className="px-6 py-4">{station.name}</td>
                <td className="px-6 py-4">{station.adress}</td>
                <td className="px-6 py-4">{station.kaupunki}</td>
                <td className="px-6 py-4">{station.kapasiteet}</td>
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
