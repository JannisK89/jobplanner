'use server'
import { z } from 'zod'
import { activatePlan, getPlan } from '@/db/queries'
import { revalidatePath } from 'next/cache'

const formSchema = z.object({
  text1: z.string().min(1).max(2005),
  text2: z.string().min(1).max(2005),
  text3: z.string().min(1).max(2005),
})

const validateFields = (formData: FormData) => {
  const validatedFields = formSchema.safeParse({
    text1: formData.get('text1'),
    text2: formData.get('text2'),
    text3: formData.get('text3'),
  })

  return validatedFields
}

export default async function savePlanAction(id: string, formData: FormData) {
  const validatedFields = validateFields(formData)

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors)
  }

  try {
    const plan = await getPlan(id)

    if (
      plan.length !== 0 &&
      validatedFields.success &&
      plan[0].plan_table.status !== 'active'
    ) {
      await activatePlan(id, {
        text1: validatedFields.data.text1,
        text2: validatedFields.data.text2,
        text3: validatedFields.data.text3,
      })
    }
  } catch (e) {
    console.error(e)
  }
  revalidatePath(`/plan/${id}`)
}
