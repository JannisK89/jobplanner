import { create } from 'zustand'
import { JobInfo } from '../types/types'

interface JobState {
  selectedJobs: JobInfo[]
  setSelectedJobs: (jobs: JobInfo[]) => void
}

export const useJobStore = create<JobState>()((set) => ({
  selectedJobs: [],
  setSelectedJobs: (jobs) => set({ selectedJobs: jobs }),
}))
