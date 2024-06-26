import { useJobStore } from '@/app/store/store'
import { JobInfo } from '@/app/types/types'
import clsx from 'clsx'

type Props = {
  job: JobInfo
  type: 'add' | 'remove'
  clickHandler: (jobs: JobInfo) => void
}

export default function Job({ job, type, clickHandler }: Props) {
  const selectedJobs = useJobStore((state) => state.selectedJobs)
  const setSelectedJobs = useJobStore((state) => state.setSelectedJobs)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedJobs(
      selectedJobs.map((selectedJob) => {
        if (selectedJob.id === job.id && e.target.name === 'education') {
          return {
            ...selectedJob,
            education: !selectedJob.education,
          }
        }
        if (selectedJob.id === job.id && e.target.name === 'experience') {
          return {
            ...selectedJob,
            experience: !selectedJob.experience,
          }
        }
        return selectedJob
      })
    )
  }

  return (
    <li className="text-md shadow p-2 hover:bg-gray-200 flex flex-col">
      <div className="flex justify-between">
        <div>
          <p className="text-ellipsis"> {job.title} </p>
          {type === 'remove' && (
            <div className="flex font-light text-sm gap-3">
              <div className="flex gap-1 items-center">
                <label>Utbildning</label>
                <input
                  type="checkbox"
                  checked={
                    selectedJobs.find(
                      (selectedJob) => selectedJob.id === job.id
                    )?.education
                  }
                  onChange={changeHandler}
                  name="education"
                />
              </div>
              <div className="flex gap-1 items-center">
                <label>Erfarenhet</label>
                <input
                  type="checkbox"
                  checked={
                    selectedJobs.find(
                      (selectedJob) => selectedJob.id === job.id
                    )?.experience
                  }
                  onChange={changeHandler}
                  name="experience"
                />
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => clickHandler(job)}
          className={clsx(
            'ml-2 text-white p-1 px-3 rounded text-nowrap max-h-8 self-center',
            type === 'add' && 'bg-blue-500 hover:bg-blue-700',
            type === 'remove' && 'bg-red-500 hover:bg-red-700'
          )}
          id={job.id}
          type="button"
        >
          {type === 'add' && 'Lägg till'}
          {type === 'remove' && 'Ta bort'}
        </button>
      </div>
    </li>
  )
}
