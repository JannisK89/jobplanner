import { JobInfo } from '@/app/types/types'
import Job from './job'

type Props = {
  removeJob: (jobs: JobInfo) => void
  addedJobs: JobInfo[]
}

export default function PickedList({ addedJobs, removeJob }: Props) {
  return (
    <div className="w-1/2 p-4 rounded flex flex-col">
      <div className="flex flex-col gap-2 ">
        <h2 className="text-lg">Tillagda yrken</h2>
        <p className="text-sm mb-10"> Max 4 yrken</p>
      </div>
      <div className="overflow-auto h-72 ">
        {addedJobs.map((job) => (
          <Job key={job.id} clickHandler={removeJob} job={job} type="remove" />
        ))}
      </div>
    </div>
  )
}
