import { JobInfo } from '@/app/types/types'
import Job from './job'

type Props = {
  removeJob: (jobs: JobInfo) => void
  addedJobs: JobInfo[]
}

export default function PickedList({ addedJobs, removeJob }: Props) {
  return (
    <div className="bg-white w-1/2 p-4 shadow rounded flex flex-col">
      <div className="flex flex-col gap-2 ">
        <h2 className="text-lg">Added Jobs</h2>
        <p className="text-sm  font-mono mb-10"> Max 4 jobs can be added </p>
      </div>
      <div className="overflow-auto h-72 ">
        {addedJobs.map((job) => (
          <Job key={job.id} clickHandler={removeJob} job={job} type="remove" />
        ))}
      </div>
    </div>
  )
}
