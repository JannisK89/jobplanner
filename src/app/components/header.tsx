import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full ext-white p-4 shadow">
      <Link href="/">
        <h1 className="ml-20 text-2xl font-bold">Arbetsplaneraren</h1>
      </Link>
    </header>
  )
}
