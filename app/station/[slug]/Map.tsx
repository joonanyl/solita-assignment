"use client"

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

type MapParams = {
  lat: number
  lng: number
}

const containerStyle = {
  width: "450px",
  height: "400px",
}

export default function StationMap({ lat, lng }: MapParams) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
  })

  const stationCoordinates = { lat, lng }

  if (loadError) return <p>Error loading the map</p>

  return (
    <div className="m-auto flex justify-center">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={stationCoordinates}
          zoom={15}
        >
          <Marker position={stationCoordinates} />
        </GoogleMap>
      )}
    </div>
  )
}
