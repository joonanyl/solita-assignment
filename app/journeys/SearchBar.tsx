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
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icons.search className="h-4 w-4" />
      </div>
      <input
        type="text"
        id="search"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        value={value}
      />
    </div>
  )
}
