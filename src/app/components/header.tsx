import Link from 'next/link'
import { CgBriefcase } from 'react-icons/cg'

export default function Header() {
  return (
    <header className="w-full p-3 shadow flex justify-between items-center lg:fixed top-0 bg-white bg-opacity-80 backdrop-blur-sm">
      <Link className="text-xl md:ml-20 flex gap-2 items-center" href="/">
        <CgBriefcase />
        <h1 className="font-bold">Arbetsplaneraren</h1>
      </Link>
      <Link
        className=" text-xs md:text-sm md:mx-16 mx-2 text-sky-900 hover:text-blue-600 transition-colors duration-800 "
        href="https://www.janniskaranikis.dev/"
        target="_blank"
      >
        JannisKaranikis.Dev
      </Link>
    </header>
  )
}
