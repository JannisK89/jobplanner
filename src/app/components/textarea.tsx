type Props = {
  label: string
  placeholder: string
  value?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({
  label,
  placeholder,
  value,
  name,
  onChange,
}: Props) {
  return (
    <div className="w-3/4 flex flex-col">
      <label className="text-base mb-1">{label}</label>
      <textarea
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="border border-gray-300 rounded p-2  h-24 ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-500 transition duration-200 ease-in-out"
        maxLength={300}
        name={name}
      />
    </div>
  )
}
