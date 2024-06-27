import { db } from './index'
import {
  planTable,
  InsertPlan,
  SelectPlan,
  occupationTable,
  SelectOccuoation,
  InsertOccupation,
} from './schema'

type OccupationWithoutId = Omit<InsertOccupation, 'planId'>

export async function createPlan(
  planData: InsertPlan,
  occupationData: OccupationWithoutId[]
) {
  const [{ id }] = await db
    .insert(planTable)
    .values(planData)
    .returning({ id: planTable.id })

  await createOccupation(occupationData, id)
}

export async function createOccupation(
  data: OccupationWithoutId[],
  id: string
) {
  await db
    .insert(occupationTable)
    .values(
      data.map((d) => ({
        title: d.title,
        education: d.education,
        experience: d.experience,
        planId: id,
      }))
    )
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
