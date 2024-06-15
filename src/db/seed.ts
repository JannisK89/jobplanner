import { db } from '.'
import { InsertUser, usersTable } from './schema'

export default async function seed(data: InsertUser[]) {
  await db.delete(usersTable)
  await db.insert(usersTable).values(data)
}
