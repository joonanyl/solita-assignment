export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Solita pre-assignment",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Journeys",
      href: "/journeys",
    },
    {
      title: "Stations",
      href: "/stations",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
