'use server'
import { z } from 'zod'
import { JobInfo } from '../types/types'
import { db } from '@/db'
import { createPlan } from '@/db/queries'

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

export default async function processFormAction(
  jobInfo: JobInfo[],
  previousState: any,
  formData: FormData
) {
  z.setErrorMap(customErrorMap)
  const validateFields = formSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    additionalInfo: formData.get('additionalInfo'),
    assistant: formData.get('assistant') === 'assistantYes',
    occupations: jobInfo,
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    }
  }

  await createPlan({
    firstName: validateFields.data.firstName,
    lastName: validateFields.data.lastName,
    text1: validateFields.data.additionalInfo,
    text2: 'Text 2 goes here',
    text3: 'Text 3 goes here',
  })

  return 'success'
}
