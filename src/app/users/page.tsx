'use client'

import { SelectUser } from '@/db/schema'
import { useState } from 'react'
import { getUsersAction } from './actions'

export default function Users() {
  const [users, setUsers] = useState<SelectUser[]>([])

  async function getUsers() {
    const data = await getUsersAction()
    setUsers(data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex flex-col">
        <form
          action={getUsers}
          className="flex flex-col items-center justify-between p-24"
        >
          <button
            className="border-white bg-sky-500 hover:bg-sky-700 p-8 rounded-lg"
            type="submit"
          >
            Get Users
          </button>
        </form>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
