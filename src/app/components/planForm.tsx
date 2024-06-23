'use client'

import { useActionState } from 'react'
import { JobInfo } from '../types/types'
import Input from './input'
import FilterList from './jobPicker/filterList'
import Radio from './radio'
import TextArea from './textarea'
import formAction from '../actions/formAction'

type Props = {
  jobInfo: JobInfo[]
}

export default function PlanForm({ jobInfo }: Props) {
  const [state, formAction] = useActionState(formAction, 0)
  return (
    <form className="md:px-10 text-sm flex flex-col">
      <div className="flex py-3 px-4 justify-between flex-wrap lg:flex-nowrap ">
        <div className=" container flex flex-col gap-2 my-4 font-light">
          <h1 className="text-6xl tracking-tighter font-bold">Skapa ny plan</h1>
          <p className="text-gray-500 font-light text-lg mb-4">
            Skapa en plan för att hålla koll på dina yrkesval och planera din
            framtid.
          </p>
          <Input label="Förnamn" placeholder="Skriv förnamn här" />
          <Input label="Efternamn" placeholder="Skriv efternman här" />
          <Input label="E-post" placeholder="Skriv e-post här" />
          <TextArea
            label="Ytterliggare Information"
            placeholder="Skriv ytterliggare information här"
          />
          <Radio
            legend="Använd AI Assistent?"
            inputs={[
              { id: 'assistantYes', label: 'Ja', checked: true },
              { id: 'assistantNo', label: 'Nej', checked: false },
            ]}
          />
        </div>
        <FilterList jobs={jobInfo} />
      </div>
      <button
        type="submit"
        className="bg-gray-900 w-3/4 self-center hover:bg-gray-700 text-white p-2 rounded mt-1 drop-shadow-2xl"
      >
        Skapa Plan
      </button>
    </form>
  )
}
