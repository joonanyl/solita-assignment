"use client"

import { useState } from "react"
import useSWR from "swr"

import { Button } from "@/components/ui/button"
import Spinner from "@/components/spinner"

import JourneysTable from "./JourneysTable"
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
  const [search, setSearch] = useState("")

  const { data, error, isLoading } = useSWR<QueryResult>(
    `/api/journeys?page=${page}`,
    fetcher,
    { revalidateOnFocus: false }
  )

  if (error) {
    return <div>An error has occurred while trying to load journeys</div>
  }

  if (isLoading) {
    return <Spinner />
  }

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

    return (
      <div className="mx-12 my-6 xl:mx-28">
        <SearchBar value={search} setValue={setSearch} />
        {isLoading ? <p>loading...</p> : <JourneysTable journeys={journeys} />}
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
