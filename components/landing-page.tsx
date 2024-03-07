/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ehUdwBPBoYk
 */
import Link from "next/link";

export function LandingPage() {
  return (
    <section className="w-full py-12 md:py-16 xl:py-24">
      <div className="container flex flex-col items-center justify-center px-4 space-y-4 md:px-6">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            Split bills with friends
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed xl:text-2xl/relaxed dark:text-gray-400">
            The easiest way to split bills with your friends. Create a group,
            add expenses, and settle up. No math required.
          </p>
        </div>
        <Link
          className="inline-flex h-11 items-center rounded-md border border-transparent border-gray-200 bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="/createGroup"
        >
          Create Group
        </Link>
      </div>
    </section>
  );
}
