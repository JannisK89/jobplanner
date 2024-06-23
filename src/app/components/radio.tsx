type Input = {
  id: string
  label: string
  checked: boolean
}

type Props = {
  legend: string
  inputs: Input[]
}

export default function Radio({ legend, inputs }: Props) {
  return (
    <fieldset className="flex flex-col mt-2">
      <legend className="text-base mb-1">{legend}</legend>
      <div className="flex gap-3">
        {inputs.map((input) => (
          <div key={input.id} className="flex">
            <input
              type="radio"
              id={input.id}
              name="assistant"
              className="mx-1 self-center"
              defaultChecked={input.checked}
            />
            <label className="self-center" htmlFor={input.id}>
              {input.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
