'use client'

import { InsertUser } from '@/db/schema'
import { FormEvent, useState } from 'react'
import sendData from './actions'
import FormInput from '@/app/components/formInput'

export default function AddForm() {
  const [formData, setFormData] = useState<InsertUser>({
    name: '',
    age: 0,
    email: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await sendData(formData)
    setFormData({
      name: '',
      age: 0,
      email: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-between p-24 gap-4"
    >
      <FormInput
        label="Name"
        id="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      <FormInput
        label="Age"
        id="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        min={0}
        max={100}
      />
      <FormInput
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />

      <button
        className="border-white bg-sky-500 hover:bg-sky-700 px-8  py-4 my-3 rounded-lg "
        type="submit"
      >
        Add User
      </button>
    </form>
  )
}
