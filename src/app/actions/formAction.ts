'use server'
import { z } from 'zod'
import { JobInfo } from '../types/types'

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
    })
    .array()
    .min(1)
    .max(4),
})

export default async function processForm(
  jobInfo: JobInfo[],
  formData: FormData
) {
  return formSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    additionalInfo: formData.get('additionalInfo'),
    assistant: formData.get('assistant') === 'assistantYes',
    occupations: jobInfo,
  })
}
