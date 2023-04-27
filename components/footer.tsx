import { Icons } from "./icons"

export default function Footer() {
  return (
    <footer className="py-10 flex flex-col justify-center border-t border-gray-200 dark:border-gray-700">
      <div>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 Joona Nylander
        </span>
        <a
          href="https://github.com/joonanyl"
          className="flex justify-center mt-2 text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
          <Icons.gitHub className="h-4 w-4 mx-2" />
          joonanyl
        </a>
      </div>
    </footer>
  )
}
