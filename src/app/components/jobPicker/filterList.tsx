'use client'
import { JobInfo } from '../../types/types'
import Picker from './picker'
import PickedList from './pickedList'
import { useJobStore } from '@/app/store/store'

export default function FilterList({ jobs }: { jobs: JobInfo[] }) {
  const selectedJobs = useJobStore((state) => state.selectedJobs)
  const setSelectedJobs = useJobStore((state) => state.setSelectedJobs)

  const addJob = (job: JobInfo) => {
    if (selectedJobs.length < 4 && selectedJobs.indexOf(job) === -1) {
      setSelectedJobs([...selectedJobs, job])
    }
  }
  const removeJob = (job: JobInfo) => {
    setSelectedJobs(
      selectedJobs.filter((selectedJob) => selectedJob.id !== job.id)
    )
  }

  return (
    <div className="container py-6">
      <h1 className="text-4xl tracking-tighter font-semibold mb-4">
        Välj Yrken
      </h1>
      <p className="text-gray-500 font-light text-lg mb-4">
        Välj upp till 4 yrken du vill jobba inom.
      </p>
      <div className="flex divide-x border border-gray-300 pl-4 rounded-xl mt-4">
        <Picker addJob={addJob} jobs={jobs} />
        <PickedList addedJobs={selectedJobs} removeJob={removeJob} />
      </div>
    </div>
  )
}
