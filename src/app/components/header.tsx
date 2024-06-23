import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full p-3 shadow">
      <Link href="/">
        <h1 className="ml-20 text-xl font-bold">Arbetsplaneraren</h1>
      </Link>
    </header>
  )
}
