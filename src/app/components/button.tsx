import clsx from 'clsx'
import { useFormStatus } from 'react-dom'
import Spinner from './spinner'

type Props = {
  text: string
  pendingText: string
}

export default function SubmitButton({ text, pendingText }: Props) {
  const { pending } = useFormStatus()
  return (
    <button
      className={clsx(
        'w-1/3 self-center  text-white p-2 rounded  mb-1 drop-shadow-2xl',
        pending && 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed',
        !pending && 'hover:bg-gray-800 bg-gray-900 '
      )}
      type="submit"
      disabled={pending}
    >
      <span className="flex justify-center self-center">
        {pending ? pendingText : text}
        {pending && <Spinner />}
      </span>
    </button>
  )
}
