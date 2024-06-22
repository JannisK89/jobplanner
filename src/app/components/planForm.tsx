'use client'

import { JobInfo } from '../types/types'
import Input from './input'
import FilterList from './jobPicker/filterList'

type Props = {
  jobInfo: JobInfo[]
}
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

export default function PlanForm({ jobInfo }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full p-10 text-sm flex flex-col gap-4"
    >
      <div className="flex p-4 justify-evenly divide-x ">
        <div className=" container flex flex-col gap-2 my-4">
          <h1 className="text-6xl tracking-tighter font-bold">Skapa ny plan</h1>
          <p className="max-w-[600px] text-gray-500 font-thin text-lg">
            Skapa en plan för att hålla koll på dina yrkesval och planera din
            framtid.
          </p>
          <Input label="Förnamn" placeholder="Förnamn" />
          <Input label="Efternmamn" placeholder="Efternman" />
        </div>
        <FilterList jobs={jobInfo} />
      </div>
    </form>
  )
}
