export type JobInfo = {
  id: string
  title: string
  education: boolean
  experience: boolean
}

export type JobInfoWithOpenPositions = JobInfo & { openPositions: number }

export type Plan = {
  firstName: string
  lastName: string
  text1: string
  text2: string
  text3: string
  occupations: JobInfo[]
  status: string
  additionalInfo: string
}
