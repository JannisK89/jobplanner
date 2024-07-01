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
        'bg-gray-900 w-1/3 self-center hover:bg-gray-700 text-white p-2 rounded mt-1 mb-4 drop-shadow-2xl',
        pending && 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed'
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
