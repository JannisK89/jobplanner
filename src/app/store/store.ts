import { create } from 'zustand'
import { JobInfo, Plan } from '../types/types'

interface JobState {
  selectedJobs: JobInfo[]
  setSelectedJobs: (jobs: JobInfo[]) => void
}

interface PlanState {
  plan: Plan
  setPlan: (plan: Plan) => void
}

export const useJobStore = create<JobState>()((set) => ({
  selectedJobs: [],
  setSelectedJobs: (jobs) => set({ selectedJobs: jobs }),
}))

export const usePlanStore = create<PlanState>()((set) => ({
  plan: {
    firstName: '',
    lastName: '',
    text1: '',
    text2: '',
    text3: '',
    occupations: [],
    additionalInfo: '',
  },
  setPlan: (plan) => set({ plan: plan }),
  clearPlan: () =>
    set({
      plan: {
        firstName: '',
        lastName: '',
        text1: '',
        text2: '',
        text3: '',
        occupations: [],
        additionalInfo: '',
      },
    }),
}))
