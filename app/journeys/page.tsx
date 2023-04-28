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
    console.log(error.message)
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
      <div className="xl:mx-28 mx-12 my-6">
        <SearchBar value={search} setValue={setSearch} />
        {isLoading ? <p>loading...</p> : <JourneysTable journeys={journeys} />}
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
