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

const averageDistance = (journeys: Journey[]) => {
  const distances = journeys.map((journey) => journey.coveredDistance)
  return (
    distances.reduce((acc, distance) => acc + distance, 0) / distances.length
  )
}

export default function SingleStationPage(url: URL) {
  const { data, error, isLoading } = useSWR<QueryParams>(
    `/api/stations/${url.params.slug}`,
    fetcher,
    { revalidateOnFocus: false, revalidateIfStale: false }
  )

  if (error)
    return <div>An error has occurred while trying to load journeys</div>

  if (isLoading) return <div>Loading...</div>

  if (data) {
    const { station, startingJourneys, endingJourneys } = data

    return (
      <div className="mx-12 my-6">
        <h1 className="font-bold text-xl">{station?.name}</h1>
        <p className="font-bold text-lg">{station?.osoite}</p>
        <p className="font-bold text-lg">
          {startingJourneys?.length} journeys starting from station
        </p>
        <p className="font-bold text-lg">
          {endingJourneys?.length} journeys ending to station
        </p>
        <p>
          The average distance of a journey starting from the station:{" "}
          {(averageDistance(startingJourneys) / 1000).toFixed(2)}
          km
        </p>
        <p>
          The average distance of a journey ending to the station:{" "}
          {(averageDistance(endingJourneys) / 1000).toFixed(2)}
          km
        </p>
        <Map lat={station?.y} lng={station?.x} />
      </div>
    )
  }
}
