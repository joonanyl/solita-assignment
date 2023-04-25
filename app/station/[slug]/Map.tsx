"use client"

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

type MapParams = {
  lat: number
  lng: number
}

export default function StationMap({ lat, lng }: MapParams) {
  const containerStyle = {
    width: "450px",
    height: "400px",
  }

  const stationCoordinates = { lat, lng }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={stationCoordinates}
        zoom={15}
      >
        <Marker position={stationCoordinates} />
      </GoogleMap>
    </LoadScript>
  )
}
