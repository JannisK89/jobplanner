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
    <div className="container p-2">
      <h2 className="text-xl  mt-2">Välj Yrken du vill jobba med</h2>
      <div className="flex">
        <Picker addJob={addJob} jobs={jobs} />
        <PickedList addedJobs={selectedJobs} removeJob={removeJob} />
      </div>
    </div>
  )
}
