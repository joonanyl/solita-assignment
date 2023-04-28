"use client"

import { useState } from "react"

export default function CreatePage() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")

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
      console.log(errorData)
      return
    }

    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="xl:mx-28 mx-12 my-6 ">
      <form
        onSubmit={handleSubmit}
        className="p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <h1 className="font-bold text-2xl text-center my-4">
          Create a new station
        </h1>
        <div className="mb-6">
          <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            ID
            <input
              type="text"
              id="id"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={id}
              onChange={(e) => setId((e.target as HTMLInputElement).value)}
              required
            />
          </label>
          <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            Name
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={name}
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
              required
            />
          </label>
          <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            Address
            <input
              type="text"
              id="address"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={address}
              onChange={(e) => setAddress((e.target as HTMLInputElement).value)}
              required
            />
          </label>
          <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            City
            <input
              type="text"
              id="city"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={city}
              onChange={(e) => setCity((e.target as HTMLInputElement).value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Create
        </button>
      </form>
    </div>
  )
}
