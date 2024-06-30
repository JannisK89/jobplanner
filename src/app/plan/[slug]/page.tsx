import Header from '@/app/components/header'
import Form from '@/app/components/plan/form'
import { getPlan } from '@/db/queries'

export default async function Page({ params }: { params: { slug: string } }) {
  const planData = await getPlan(params.slug)
  const plan = planData[0].plan_table
  const occupations = planData.map((data) => data.occupation_table)
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex">
        <Form plan={plan} occupations={occupations} />
      </main>
    </div>
  )
}
