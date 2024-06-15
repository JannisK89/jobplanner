import { InsertUser } from '@/db/schema'
import seed from '@/db/seed'

const data: InsertUser[] = [
  {
    name: 'Alice',
    age: 30,
    email: 'Alice@test.com',
  },
  {
    name: 'Bob',
    age: 25,
    email: 'Bob@test.com',
  },
  {
    name: 'Charlie',
    age: 35,
    email: 'Charlie@test.com',
  },
]

export default function Seed() {
  async function seedData() {
    'use server'
    await seed(data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form
          action={seedData}
          className="flex flex-col items-center justify-between p-24"
        >
          <button
            className="border-white bg-sky-500 hover:bg-sky-700 p-8 rounded-lg"
            type="submit"
          >
            Seed Data
          </button>
        </form>
      </div>
    </main>
  )
}
