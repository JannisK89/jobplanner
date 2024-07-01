import clsx from 'clsx'
import { useFormStatus } from 'react-dom'

type Props = {
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'password'
  value?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  name,
  onChange,
}: Props) {
  const { pending } = useFormStatus()
  return (
    <div className="md:w-3/4 flex flex-col">
      <label className="text-base mb-1">{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className={clsx(
          'border border-gray-300 rounded p-2 ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-500 transition duration-200 ease-in-out',
          pending && 'bg-gray-200'
        )}
        name={name}
        required
        disabled={pending}
      />
    </div>
  )
}
