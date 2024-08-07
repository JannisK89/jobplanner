import { JobInfo } from '@/app/types/types'
import Job from './job'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

type Props = {
  jobs: JobInfo[]
  addJob: (jobs: JobInfo) => void
}

export default function Picker({ jobs, addJob }: Props) {
  const { pending } = useFormStatus()
  const [filter, setFilter] = useState('')
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }
  return (
    <div className="md:w-1/2 mr-2 p-4 rounded flex flex-col">
      <div className="flex flex-col gap-2 ">
        <label className="text-lg" htmlFor="filter">
          Sök yrken
        </label>
        <input
          className="border border-gray-300 p-2 mb-6"
          type="text"
          value={filter}
          onChange={changeHandler}
          id="filter"
          disabled={pending}
        />
      </div>
      <ul className="overflow-auto h-72 ">
        {jobs
          .filter((job) => {
            return job.title.toLowerCase().includes(filter.toLowerCase())
          })
          .slice(0, 500)
          .map((job) => (
            <Job key={job.id} job={job} clickHandler={addJob} type="add" />
          ))}
      </ul>
    </div>
  )
}
