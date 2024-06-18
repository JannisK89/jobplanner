import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <div className="w-full max-w-lg text-sm flex flex-col gap-4 ">
        <Link
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          href="/users"
        >
          Go To Users
        </Link>
        <Link
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          href="/users/add"
        >
          Go To Add Users
        </Link>
      </div>
    </main>
  )
}
