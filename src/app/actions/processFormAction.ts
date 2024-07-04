'use server'
import { z } from 'zod'
import { JobInfo } from '../types/types'
import { createPlan } from '@/db/queries'
import generateTexts from '../lib/gtp'
import { redirect } from 'next/navigation'
import openPositions from '../lib/fetchOpenPositions'

const formSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().min(1).email().max(80),
  additionalInfo: z.string().max(300),
  assistant: z.boolean(),
  occupations: z
    .object({
      title: z.string().min(1).max(100),
      id: z.string().min(1).max(30),
      education: z.boolean(),
      experience: z.boolean(),
    })
    .array()
    .min(1)
    .max(4),
})

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    return { message: 'Du måste välja minst 1 yrke.' }
  }
  return { message: ctx.defaultError }
}

const validateFields = (formData: FormData, jobInfo: JobInfo[]) => {
  z.setErrorMap(customErrorMap)
  const validatedFields = formSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    additionalInfo: formData.get('additionalInfo'),
    assistant: formData.get('assistant') === 'assistantYes',
    occupations: jobInfo,
  })

  return validatedFields
}

export default async function processFormAction(
  jobInfo: JobInfo[],
  previousState: any,
  formData: FormData
) {
  let generatedTexts: string[] | undefined
  let id
  const validatedFields = validateFields(formData, jobInfo)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const occupationsWithPositions = await openPositions(
    validatedFields.data.occupations
  )

  try {
    if (validatedFields.data.assistant) {
      generatedTexts = await generateTexts({
        firstName: validatedFields.data.firstName,
        lastName: validatedFields.data.lastName,
        occupations: occupationsWithPositions,
        additionalInformation: validatedFields.data.additionalInfo,
      })

      if (generatedTexts === undefined) {
        throw new Error('Texten kunde inte genereras korrekt.')
      }
    } else {
      generatedTexts = ['', '', '']
    }

    id = await createPlan(
      {
        firstName: validatedFields.data.firstName,
        lastName: validatedFields.data.lastName,
        text1: generatedTexts[0],
        text2: generatedTexts[1],
        text3: generatedTexts[2],
      },
      validatedFields.data.occupations
    )
  } catch (e) {
    console.error(e)
    return 'Något gick fel när planen skulle skapas. Vänligen försök igen inom kort.'
  } finally {
    if (id !== undefined) {
      redirect(`/plan/${id}`)
    }
  }
}
