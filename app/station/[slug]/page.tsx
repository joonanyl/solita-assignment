"use client"

import { useState } from "react"
import Link from "next/link"
import useSWR from "swr"

import Spinner from "@/components/spinner"

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

const monthCodes = {
  "05": "May",
  "06": "June",
  "07": "July",
}

export default function SingleStationPage({ params: { slug } }: URL) {
  const [month, setMonth] = useState<string | null>(null)

  const { data, error, isLoading } = useSWR<QueryParams>(
    [`/api/stations/${slug}?month=${month}`],
    fetcher,
    { revalidateOnFocus: false }
  )

  if (error)
    return <div>An error has occurred while trying to load journeys</div>

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )

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
        <div className="flex rounded-md shadow-sm justify-center" role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => setMonth("05")}
          >
            May
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
              month === "06"
                ? "bg-blue-700 text-white"
                : "bg-white text-gray-900"
            }`}
            onClick={() => setMonth("06")}
          >
            June
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => setMonth("07")}
          >
            July
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => setMonth(null)}
          >
            All
          </button>
        </div>
        <Map lat={station?.y} lng={station?.x} />
        <h1 className="font-bold text-xl">{station?.name}</h1>
        <p className="font-bold text-lg">{station?.osoite}</p>
        <p className="font-bold text-lg">
          {startingJourneys?.length} journeys starting from station in{" "}
          {!month ? "all months" : monthCodes[month]}
        </p>
        <p className="font-bold text-lg">
          {endingJourneys?.length} journeys ending to station in{" "}
          {!month ? "all months" : monthCodes[month]}
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
