'use client'
import { JobInfo } from '../../types/types'
import Picker from './picker'
import PickedList from './pickedList'
import { useState } from 'react'

export default function FilterList({ jobs }: { jobs: JobInfo[] }) {
  const [addedJobs, setAddedJobs] = useState<JobInfo[]>([])

  const addJob = (job: JobInfo) => {
    if (addedJobs.length < 4 && addedJobs.indexOf(job) === -1) {
      setAddedJobs([...addedJobs, job])
    }
  }
  const removeJob = (job: JobInfo) => {
    setAddedJobs(addedJobs.filter((addedJob) => addedJob.id !== job.id))
  }
  return (
    <div className="flex">
      <Picker addJob={addJob} jobs={jobs} />
      <PickedList addedJobs={addedJobs} removeJob={removeJob} />
    </div>
  )
}
