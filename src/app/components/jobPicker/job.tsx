import { JobInfo } from '@/app/types/types'
type Props = {
  job: JobInfo
  type: 'add' | 'remove'
  clickHandler: (jobs: JobInfo) => void
}

export default function Job({ job, type, clickHandler }: Props) {
  return (
    <li className="text-lg shadow p-2 hover:bg-gray-200 flex justify-between">
      <p> {job.title} </p>
      <button
        onClick={() => clickHandler(job)}
        className="ml-2 bg-blue-500 hover:bg-blue-400 text-white p-1 px-3 rounded text-sm"
        id={job.id}
      >
        {type === 'add' && 'Add'}
        {type === 'remove' && 'Remove'}
      </button>
    </li>
  )
}
