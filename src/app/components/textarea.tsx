import clsx from 'clsx'
import { useFormStatus } from 'react-dom'

type Props = {
  label: string
  placeholder?: string
  value?: string
  name?: string
  height?: 'h-20' | 'h-60'
  maxLength?: number
  disabled?: boolean
  labelStyle?: 'normal' | 'large'
  infoText?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({
  label,
  placeholder,
  value,
  name,
  height = 'h-20',
  maxLength,
  labelStyle = 'normal',
  disabled = false,
  infoText,
  onChange,
}: Props) {
  const { pending } = useFormStatus()
  return (
    <div className="md:w-3/4 flex flex-col">
      <label
        htmlFor={name}
        className={clsx(
          'md:mb-1 mb-2',
          labelStyle === 'large' && 'md:text-xl text-lg font-normal',
          labelStyle === 'normal' && 'text-base'
        )}
      >
        {label}
      </label>
      <p className="text-sm text-gray-500 mb-2">{infoText}</p>
      <textarea
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={clsx(
          'border border-gray-300 rounded p-2 ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-500 transition duration-200 ease-in-out',
          height,
          pending && 'bg-gray-200'
        )}
        maxLength={maxLength}
        name={name}
        disabled={disabled || pending}
      />
    </div>
  )
}
