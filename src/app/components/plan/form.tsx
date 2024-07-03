'use client'
import { useState } from 'react'
import TextArea from '../textarea'
import { useJobStore } from '@/app/store/store'
import SubmitButton from '../button'
import savePlanAction from '@/app/actions/savePlanAction'

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

const infoText = `Tänk på att informationen från AI Assistenten inte alltid 
är korrekt.`

export default function Form({ plan, occupations }: Props) {
  const isProposed = plan.status === 'proposed'
  const [text1, setText1] = useState(plan.text1)
  const [text2, setText2] = useState(plan.text2)
  const [text3, setText3] = useState(plan.text3)
  const activatePlanWithId = savePlanAction.bind(null, plan.id)

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
    <form
      action={activatePlanWithId}
      className="flex flex-col gap-6 md:px-12 px-4 py-6 container"
    >
      <div className="lg:fixed lg:right-0 lg:top-14 border bg-gray-100 p-6 lg:min-w-96">
        <h2 className="text-xl font-bold">
          {plan.firstName} {plan.lastName}
        </h2>
        <p className="text-lg">
          <span className="font-medium">Status: </span>
          {isProposed ? 'Föreslagen' : 'Aktiv'}
        </p>
        <div className="flex flex-col gap-2 mt-3">
          <h3 className="text-lg font-semibold ">Yrkesinformation</h3>
          <ul className="flex flex-col gap-2">
            {occupations.map((occupation) => {
              return (
                occupation !== null && (
                  <li
                    className="border flex flex-col bg-gray-50 border-gray-200 shadow p-4 "
                    key={occupation.id}
                  >
                    <span className="font-semibold">{occupation.title}</span>
                    <span>
                      {' '}
                      Utbildning: {occupation.education ? 'Ja' : 'Nej'}{' '}
                    </span>
                    <span>
                      {' '}
                      Erfarenhet: {occupation.experience ? 'Ja' : 'Nej'}
                    </span>
                  </li>
                )
              )
            })}
          </ul>
        </div>
      </div>
      {plan.status === 'proposed' ? (
        <>
          <div className="flex flex-col gap-6 lg:mt-10 lg:w-5/6">
            <TextArea
              label="Arbetsökandes Styrkor"
              maxLength={2000}
              height="h-60"
              disabled={!isProposed}
              labelStyle="large"
              name="text1"
              value={text1}
              onChange={changeHandler}
              infoText={infoText}
            />
            <TextArea
              label="Arbetsökandes Förbättringsmöjligheter"
              maxLength={2000}
              height="h-60"
              disabled={!isProposed}
              labelStyle="large"
              name="text2"
              value={text2}
              onChange={changeHandler}
              infoText={infoText}
            />
            <TextArea
              label="Öka chansen för jobb"
              maxLength={2000}
              height="h-60"
              disabled={!isProposed}
              labelStyle="large"
              name="text3"
              value={text3}
              onChange={changeHandler}
              infoText={infoText}
            />
          </div>

          <SubmitButton text="Spara" pendingText="Sparar Plan.." />
        </>
      ) : (
        <>
          <div className="flex flex-col mt-2 lg:w-4/6 pt-8 px-8">
            <h2 className="text-lg font-semibold">Arbetsökandes Styrkor</h2>
            <pre className="text-wrap font-sans">{text1}</pre>
          </div>
          <div className="flex flex-col lg:w-4/6 mt-2 px-8">
            <h2 className="text-lg font-semibold">
              Arbetsökandes Förbättringsmöjligheter
            </h2>
            <pre className="text-wrap font-sans">{text2}</pre>
          </div>
          <div className="flex flex-col lg:w-4/6 mt-2 px-8">
            <h2 className="text-lg font-semibold">Öka chansen för jobb</h2>
            <pre className="text-wrap font-sans">{text3}</pre>
          </div>
        </>
      )}
    </form>
  )
}
