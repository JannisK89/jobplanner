import Link from 'next/link'
import { CgBriefcase } from 'react-icons/cg'

export default function Header() {
  return (
    <header className="w-full p-3 shadow">
      <Link className="text-xl ml-20 flex gap-2 items-center" href="/">
        <CgBriefcase />
        <h1 className="font-bold">Arbetsplaneraren</h1>
      </Link>
    </header>
  )
}
