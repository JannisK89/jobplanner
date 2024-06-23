type Props = {
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'password'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: Props) {
  return (
    <div className="w-3/4 flex flex-col">
      <label className="text-base mb-1">{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded p-2 ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-500 transition duration-200 ease-in-out"
      />
    </div>
  )
}
