'use server'
import { createUser } from '@/db/queries'
import { InsertUser } from '@/db/schema'

export default async function sendData(data: InsertUser) {
  await createUser({
    name: data.name,
    age: data.age,
    email: data.email,
  })
}
