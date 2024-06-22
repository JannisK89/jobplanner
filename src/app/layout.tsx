import type { Metadata } from 'next'
import './globals.css'
import { Libre_Franklin } from 'next/font/google'
import { Chivo } from 'next/font/google'

const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
})
const chivo = Chivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-chivo',
})

export const metadata: Metadata = {
  title: 'Arbetsplaneraren',
  description: 'Skapa planer för att hitta ditt drömjobb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={libre_franklin.variable + ' ' + chivo.variable}>
        {children}
      </body>
    </html>
  )
}
