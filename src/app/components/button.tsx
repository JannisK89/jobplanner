type Props = {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({
  onClick,
  children,
  className,
  type = 'button',
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-700 hover:bg-blue-500 transition-colors ease-in-out duration-300 text-white rounded-xl shadow p-3 ${className}`}
      type={type}
    >
      {children}
    </button>
  )
}
