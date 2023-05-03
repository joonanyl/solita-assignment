import { Icons } from "./icons"

export default function Footer() {
  return (
    <footer className="mt-6 flex flex-col justify-center border-t border-gray-200 py-10 dark:border-gray-700">
      <div>
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023 Joona Nylander
        </span>
        <a
          href="https://github.com/joonanyl"
          className="mt-2 flex justify-center text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          <Icons.gitHub className="mx-2 h-4 w-4" />
          joonanyl
        </a>
      </div>
    </footer>
  )
}
