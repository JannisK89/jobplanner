'use client'
import { useState } from 'react'
import TextArea from '../textarea'
import { useJobStore } from '@/app/store/store'

type Props = {
  plan: {
    id: string
    firstName: string
    lastName: string
    text1: string
    text2: string
    text3: string
    createdAt: Date
    status: string
  }
  occupations: ({
    title: string
    id: string
    education: boolean
    experience: boolean
    planId: string
  } | null)[]
}

export default function Form({ plan, occupations }: Props) {
  const isProposed = plan.status === 'proposed'
  const [text1, setText1] = useState(plan.text1)
  const [text2, setText2] = useState(plan.text2)
  const [text3, setText3] = useState(plan.text3)
  const setSelectedJobs = useJobStore((state) => state.setSelectedJobs)
  setSelectedJobs([])

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === 'text1') {
      setText1(e.target.value)
    }
    if (e.target.name === 'text2') {
      setText2(e.target.value)
    }
    if (e.target.name === 'text3') {
      setText3(e.target.value)
    }
  }
  return (
    <form className="flex flex-col gap-6 md:px-60 py-6 container">
      <div>
        <h2 className="text-xl font-bold">
          {plan.firstName} {plan.lastName}
        </h2>
        <p className="text-lg">
          <span className="font-medium">Status: </span>
          {isProposed ? 'Föreslagen' : 'Aktiv'}
        </p>
      </div>
      <div className="flex flex-col gap-2 -2/3">
        <h3 className="text-lg font-semibold ">Yrkesinformation</h3>
        <ul className="flex flex-col gap-2">
          {occupations.map((occupation) => {
            return (
              occupation !== null && (
                <li
                  className="border bg-gray-50 border-gray-200 shadow p-4 w-3/4"
                  key={occupation.id}
                >
                  <span className="font-semibold">{occupation.title}</span> -
                  Utbildning: {occupation.education ? 'Ja' : 'Nej'} -
                  Erfarenhet: {occupation.experience ? 'Ja' : 'Nej'}
                </li>
              )
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        <TextArea
          label="Arbetsökandes Styrkor"
          maxLength={1000}
          height="h-60"
          disabled={!isProposed}
          labelStyle="large"
          name="text1"
          value={text1}
          onChange={changeHandler}
        />
        <TextArea
          label="Arbetsökandes Förbättringsmöjligheter"
          maxLength={1000}
          height="h-60"
          disabled={!isProposed}
          labelStyle="large"
          name="text2"
          value={text2}
          onChange={changeHandler}
        />
        <TextArea
          label="Öka chansen för jobb"
          maxLength={1000}
          height="h-60"
          disabled={!isProposed}
          labelStyle="large"
          name="text3"
          value={text3}
          onChange={changeHandler}
        />
      </div>
    </form>
  )
}
