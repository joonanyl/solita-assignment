"use client"

import { useState } from "react"
import { redirect } from "next/navigation"

export default function CreatePage() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedId = parseInt(id)

    const response = await fetch("/api/stations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parsedId, name, address, city }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      setError(errorData)
    }

    redirect("/stations")
  }

  return (
    <div className="mx-12 my-6 xl:mx-28 ">
      {error && <h2>{error}</h2>}
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-gray-200 p-6 shadow dark:border-gray-700 dark:bg-gray-800"
      >
        <h1 className="my-4 text-center text-2xl font-bold">
          Create a new station
        </h1>
        <div className="mb-6">
          <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
            ID
            <input
              type="text"
              id="id"
              className="text-md dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={id}
              onChange={(e) => setId((e.target as HTMLInputElement).value)}
              required
            />
          </label>
          <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
            Name
            <input
              type="text"
              id="name"
              className="text-md dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={name}
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
              required
            />
          </label>
          <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
            Address
            <input
              type="text"
              id="address"
              className="text-md dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={address}
              onChange={(e) => setAddress((e.target as HTMLInputElement).value)}
              required
            />
          </label>
          <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
            City
            <input
              type="text"
              id="city"
              className="text-md dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity((e.target as HTMLInputElement).value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Create
        </button>
      </form>
    </div>
  )
}
