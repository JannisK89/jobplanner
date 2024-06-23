import { JobInfo } from '@/app/types/types'
import clsx from 'clsx'

type Props = {
  job: JobInfo
  type: 'add' | 'remove'
  clickHandler: (jobs: JobInfo) => void
}

export default function Job({ job, type, clickHandler }: Props) {
  return (
    <li className="text-md shadow p-2 hover:bg-gray-200 flex justify-between ">
      <p className="text-ellipsis"> {job.title} </p>
      <button
        onClick={() => clickHandler(job)}
        className={clsx(
          'ml-2 text-white p-1 px-3 rounded text-nowrap max-h-8 self-center',
          type === 'add' && 'bg-blue-500 hover:bg-blue-700',
          type === 'remove' && 'bg-red-500 hover:bg-red-700'
        )}
        id={job.id}
      >
        {type === 'add' && 'Lägg till'}
        {type === 'remove' && 'Ta bort'}
      </button>
    </li>
  )
}
