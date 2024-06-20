import { JobInfo } from '@/app/types/types'
import Job from './job'
import { useState } from 'react'

type Props = {
  jobs: JobInfo[]
  addJob: (jobs: JobInfo) => void
}

export default function Picker({ jobs, addJob }: Props) {
  const [filter, setFilter] = useState('')
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }
  return (
    <div className="bg-white w-1/2 mr-4 p-4 shadow rounded flex flex-col">
      <div className="flex flex-col gap-2 ">
        <label className="text-lg" htmlFor="filter">
          Filter by job title
        </label>
        <input
          className="border border-gray-300 p-2 mb-6"
          type="text"
          value={filter}
          onChange={changeHandler}
          id="filter"
        />
      </div>
      <ul className="overflow-auto h-72 ">
        {jobs
          .filter((job) => {
            return job.title.toLowerCase().includes(filter.toLowerCase())
          })
          .map((job) => (
            <Job key={job.id} job={job} clickHandler={addJob} type="add" />
          ))}
      </ul>
    </div>
  )
}
