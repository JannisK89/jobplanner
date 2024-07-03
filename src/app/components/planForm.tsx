'use client'

import { JobInfo } from '../types/types'
import Input from './input'
import FilterList from './jobPicker/filterList'
import Radio from './radio'
import TextArea from './textarea'
import { useJobStore } from '../store/store'
import { useFormState } from 'react-dom'
import processFormAction from '../actions/processFormAction'
import SubmitButton from './button'
import { useEffect } from 'react'

type Props = {
  jobInfo: JobInfo[]
}

export default function PlanForm({ jobInfo }: Props) {
  const selectedJobs = useJobStore((state) => state.selectedJobs)
  const setSelectedJobs = useJobStore((state) => state.setSelectedJobs)
  const processFormWithJobsAction = processFormAction.bind(null, selectedJobs)
  const [state, formAction] = useFormState(processFormWithJobsAction, null)
  useEffect(() => {
    return () => {
      setSelectedJobs([])
    }
  }, [setSelectedJobs])

  return (
    <form action={formAction} className="text-sm md:px-10 flex flex-col">
      <div className="flex py-1 px-4 justify-between flex-wrap lg:flex-nowrap ">
        <div className=" container flex flex-col gap-2 mt-4 font-light">
          <h1 className="md:text-6xl text-3xl tracking-tighter font-bold">
            Skapa ny plan
          </h1>
          <p className="text-gray-500 font-light text-base md:text-lg  md:mb-4">
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
            maxLength={300}
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
        {state !== null && state !== undefined && typeof state !== 'string' && (
          <p>{state.errors.occupations}</p>
        )}
        {typeof state === 'string' && <p>{state}</p>}
      </div>
      <SubmitButton
        text="Skapa Plan"
        pendingText="Skapar Plan... Detta kan ta någon minut"
      />
    </form>
  )
}
