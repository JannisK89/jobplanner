import { Plan, JobInfo } from '@/app/types/types'

export type UserData = Pick<
  Plan,
  'firstName' | 'lastName' | 'additionalInfo'
> & {
  occupations: Pick<JobInfo, 'title' | 'education' | 'experience'>[]
  assistant: boolean
  email: string
}

export const userWithAssistant: UserData = {
  firstName: 'John',
  lastName: 'Doe',
  additionalInfo: 'This is a testing person John',
  assistant: true,
  email: 'Playwright.John@Testing.com',
  occupations: [
    {
      title: 'Frontend-utvecklare',
      education: true,
      experience: true,
    },
    {
      title: 'Systemutvecklare',
      education: false,
      experience: true,
    },
    {
      title: 'Testutvecklare',
      education: true,
      experience: false,
    },
    {
      title: 'Mjukvaruutvecklare',
      education: false,
      experience: false,
    },
  ],
}

export const userWithOutAssistant: UserData = {
  firstName: 'Jane',
  lastName: 'Doe',
  additionalInfo: 'This is a testing person Jane',
  assistant: false,
  email: 'Playwright.Jane@Testing.com',
  occupations: [
    {
      title: 'Mjukvarutestare',
      education: false,
      experience: false,
    },
    {
      title: 'Atomfysiker',
      education: true,
      experience: true,
    },
  ],
}
