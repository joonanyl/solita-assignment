"use client"

import useSWR from "swr"

import { Journey } from "@/app/types/journey"

import Map from "./Map"

type URL = {
  params: {
    slug: string
  }
}

type QueryParams = {
  station: Station
  startingJourneys: Journey[]
  endingJourneys: Journey[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function SingleStationPage(url: URL) {
  const { data, error, isLoading } = useSWR<QueryParams>(
    `/api/stations/${url.params.slug}`,
    fetcher,
    { revalidateOnFocus: false, revalidateIfStale: false }
  )

  if (error) {
    console.log(error.message)
    return <div>An error has occurred while trying to load journeys</div>
  }
  if (isLoading) return <div>Loading...</div>

  if (data) {
    return (
      <div className="mx-12 my-6">
        <h1 className="font-bold text-xl">{data.station?.name}</h1>
        <p className="font-bold text-lg">{data.station?.osoite}</p>
        <p className="font-bold text-lg">
          Amount of journeys starting from the station:{" "}
          {data.startingJourneys?.length}
        </p>
        <p className="font-bold text-lg">
          Amount of journeys ending to the station:{" "}
          {data.endingJourneys?.length}
        </p>
        <Map lat={data.station?.y} lng={data.station?.x} />
      </div>
    )
  }
}
