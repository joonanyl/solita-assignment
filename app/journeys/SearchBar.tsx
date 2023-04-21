import { Dispatch, SetStateAction } from "react"

import { Icons } from "@/components/icons"

type Params = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function SearchBar({ value, setValue }: Params) {
  return (
    <div className="relative w-40">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icons.search className="h-4 w-4" />
      </div>
      <input
        type="text"
        id="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        value={value}
      />
    </div>
  )
}
