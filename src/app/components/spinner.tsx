import Image from 'next/image'

export default function Spinner() {
  return (
    <Image
      className="self-center"
      src="/spinner.svg"
      alt="loading"
      width={24}
      height={24}
    />
  )
}
