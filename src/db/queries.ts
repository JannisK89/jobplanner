import { eq } from 'drizzle-orm'
import { db } from './index'
import {
  planTable,
  InsertPlan,
  SelectPlan,
  occupationTable,
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
  await db.insert(occupationTable).values(
    data.map((d) => ({
      title: d.title,
      education: d.education,
      experience: d.experience,
      planId: id,
    }))
  )
}

export async function getPlan(id: SelectPlan['id']) {
  return db
    .select()
    .from(planTable)
    .leftJoin(occupationTable, eq(planTable.id, occupationTable.planId))
    .where(eq(planTable.id, id))
}
