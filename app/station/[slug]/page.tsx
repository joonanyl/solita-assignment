"use client"

import Link from "next/link"
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

const getPopularStations = (
  journeys: Journey[],
  stationNameProp: "returnStationName" | "departureStationName",
  stationIdProp: "returnStationId" | "departureStationId"
) => {
  const counts = journeys.reduce((acc, journey) => {
    const stationName = journey[stationNameProp]
    acc[stationName] = acc[stationName] ? acc[stationName] + 1 : 1 // If name exists in array, +1 its count otherwise add it there with count of 1
    return acc
  }, {} as { [stationName: string]: number })

  const popularStations = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([stationName, count]) => ({
      name: stationName,
      id: journeys.find(
        (journey) => journey[stationNameProp] === stationName
      )?.[stationIdProp],
    }))

  return popularStations
}

export default function SingleStationPage({ params: { slug } }: URL) {
  const { data, error, isLoading } = useSWR<QueryParams>(
    `/api/stations/${slug}`,
    fetcher,
    { revalidateOnFocus: false, revalidateIfStale: false }
  )

  if (error)
    return <div>An error has occurred while trying to load journeys</div>

  if (isLoading) return <div>Loading...</div>

  if (data) {
    const { station, startingJourneys, endingJourneys } = data

    const favouriteReturnStations = getPopularStations(
      startingJourneys || [],
      "returnStationName",
      "returnStationId"
    )
    const favouriteDepartureStations = getPopularStations(
      endingJourneys || [],
      "departureStationName",
      "departureStationId"
    )

    return (
      <div className="mx-12 my-6 flex flex-col justify-center text-center">
        <Map lat={station?.y} lng={station?.x} />
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
        <ul>
          Top 5 most popular departure stations for journeys ending to this
          station:
          {favouriteDepartureStations.map((station) => (
            <Link href={`/station/${station.id}`} key={station.id}>
              <li className="hover:underline">{station.name}</li>
            </Link>
          ))}
        </ul>
        <ul>
          Top 5 most popular return stations for journeys starting from the
          station:
          {favouriteReturnStations.map((station) => (
            <Link href={`/station/${station.id}`} key={station.id}>
              <li className="hover:underline">{station.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }
}
