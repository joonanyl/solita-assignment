"use client"

import { useState } from "react"
import Link from "next/link"
import useSWR from "swr"

import { Button } from "@/components/ui/button"
import Spinner from "@/components/spinner"

import SearchBar from "../journeys/SearchBar"
import StationsTable from "./StationsTable"

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
    { revalidateOnFocus: false }
  )

  if (error) {
    return <div>An error has occurred while trying to load journeys</div>
  }
  if (isLoading) return <Spinner />

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
      <div className="mx-12 my-6 xl:mx-28">
        <div className="flex justify-between">
          <SearchBar value={search} setValue={setSearch} />
          <Link href="/stations/create">
            <Button>Create new</Button>
          </Link>
        </div>
        <StationsTable stations={stations} />
        <p className="mt-4 text-center font-bold">
          {page} / {totalPages}
        </p>
        <div className="my-4 flex justify-center gap-4">
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
