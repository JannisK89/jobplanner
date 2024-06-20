'use client'
import { useState } from 'react'
import { JobInfo } from '../types/types'

export default function FilterList({ jobs }: { jobs: JobInfo[] }) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }
  const [filter, setFilter] = useState('')
  return (
    <div className="bg-white p-4 shadow  flex flex-col">
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
      <div className="overflow-auto h-72 ">
        {jobs
          .filter((job) => {
            return job.title.toLowerCase().includes(filter.toLowerCase())
          })
          .map((job) => (
            <p className="text-lg shadow p-2 hover:bg-gray-200" key={job.id}>
              {job.title}
            </p>
          ))}
      </div>
    </div>
  )
}
