import Link from 'next/link'
import Button from './button'

type props = {
  name: string
  age: number
  email: string
}

export default function User({ name, age, email }: props) {
  return (
    <li className="shadow border m-2 rounded bg-gray-50 flex p-6 gap-2 justify-between w-full">
      <div className="flex flex-col">
        <span>Name: {name}</span>
        <span>Age: {age}</span>
        <span>Email: {email}</span>
      </div>
      <Link href={'/'} className="self-center">
        <Button>New Plan</Button>
      </Link>
    </li>
  )
}
