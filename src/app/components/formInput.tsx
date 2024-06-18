type props = {
  label: string
  id: string
  type: 'text' | 'number' | 'email'
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  min?: number
  max?: number
}
export default function FormInput({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  min,
  max,
}: props) {
  return (
    <div className="flex flex-col w-full gap-2 ">
      <label className="text-lg" htmlFor={id}>
        {label}
      </label>
      <input
        className="border border-gray-300 p-2 rounded-lg grow"
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  )
}
