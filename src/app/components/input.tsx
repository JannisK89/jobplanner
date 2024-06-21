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
    <div className="p4 w-1/2 flex flex-col">
      <label className="text-lg mb-1">{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className="shadow p-2"
      />
    </div>
  )
}
