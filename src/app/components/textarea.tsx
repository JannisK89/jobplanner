import clsx from 'clsx'

type Props = {
  label: string
  placeholder?: string
  value?: string
  name?: string
  height?: 'h-20' | 'h-60'
  maxLength?: number
  disabled?: boolean
  labelStyle?: 'normal' | 'large'
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
  onChange,
}: Props) {
  return (
    <div className="w-3/4 flex flex-col">
      <label
        className={clsx(
          'mb-1',
          labelStyle === 'large' && 'text-xl font-normal',
          labelStyle === 'normal' && 'text-base'
        )}
      >
        {label}
      </label>
      <textarea
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={clsx(
          'border border-gray-300 h-60 rounded p-2 ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-500 transition duration-200 ease-in-out',
          height
        )}
        maxLength={maxLength}
        name={name}
        disabled={disabled}
      />
    </div>
  )
}
