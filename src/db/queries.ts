import { asc, count, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from './index'
import {
  planTable,
  InsertPlan,
  SelectPlan,
  occupationTable,
  SelectOccuoation,
  InsertOccupation,
} from './schema'

export async function createPlan(data: InsertPlan) {
  await db.insert(planTable).values(data)
}

export async function createOccupation(data: InsertOccupation[]) {
  await db.insert(occupationTable).values(data)
}

/*

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number
    name: string
    age: number
    email: string
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id))
}

export async function getAllUsers(): Promise<
  Array<{
    id: number
    name: string
    age: number
    email: string
  }>
> {
  return db.select().from(usersTable)
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    postsCount: number
    id: number
    name: string
    age: number
    email: string
  }>
> {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
}
*/
