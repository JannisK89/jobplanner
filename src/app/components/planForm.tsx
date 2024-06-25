'use client'

import { JobInfo } from '../types/types'
import Input from './input'
import FilterList from './jobPicker/filterList'
import Radio from './radio'
import TextArea from './textarea'
import { useJobStore } from '../store/store'
import { useFormState } from 'react-dom'
import formValicationAction from '../actions/formValidationAction'

type Props = {
  jobInfo: JobInfo[]
}

export default function PlanForm({ jobInfo }: Props) {
  const selectedJobs = useJobStore((state) => state.selectedJobs)
  const processFormWithJobsAction = formValicationAction.bind(
    null,
    selectedJobs
  )
  const [state, formAction] = useFormState(processFormWithJobsAction, null)

  return (
    <form action={formAction} className="md:px-10 text-sm flex flex-col">
      <div className="flex py-3 px-4 justify-between flex-wrap lg:flex-nowrap ">
        <div className=" container flex flex-col gap-2 my-4 font-light">
          <h1 className="text-6xl tracking-tighter font-bold">Skapa ny plan</h1>
          <p className="text-gray-500 font-light text-lg mb-4">
            Skapa en plan för att hålla koll på dina yrkesval och planera din
            framtid.
          </p>
          <Input
            label="Förnamn"
            name="firstName"
            placeholder="Skriv förnamn här"
          />
          <Input
            label="Efternamn"
            name="lastName"
            placeholder="Skriv efternamn här"
          />
          <Input label="E-post" name="email" placeholder="Skriv e-post här" />
          <TextArea
            label="Ytterliggare Information"
            placeholder="Skriv ytterliggare information här"
            name="additionalInfo"
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
      <div className=" flex h-6 w-full text-red-700 justify-center">
        {state !== null && <p>{state.errors?.occupations}</p>}
      </div>
      <button
        type="submit"
        className="bg-gray-900 w-1/3 self-center hover:bg-gray-700 text-white p-2 rounded mt-1 drop-shadow-2xl"
      >
        Skapa Plan
      </button>
    </form>
  )
}
