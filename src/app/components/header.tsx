import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-blue-600 text-white p-4 shadow">
      <Link href="/">
        <h1 className="ml-4 text-2xl font-bold font-mono">Job Planner</h1>
      </Link>
    </header>
  )
}
