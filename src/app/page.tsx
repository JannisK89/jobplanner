import { JobInfo } from './types/types'
import FilterList from './components/jobPicker/filterList'
import Input from './components/input'

type Taxonomy = {
  'taxonomy/id': string
  'taxonomy/preferred-label': string
}

const fetchJobData = async () => {
  const res = await fetch(
    'https://taxonomy.api.jobtechdev.se/v1/taxonomy/main/concepts?type=job-title&version=latest&limit=100',
    { next: { revalidate: false } }
  )
  const taxonomy: Taxonomy[] = await res.json()
  const jobInfo: JobInfo[] = taxonomy.map((job) => ({
    id: job['taxonomy/id'],
    title: job['taxonomy/preferred-label'],
  }))
  return jobInfo
}

export default async function Home() {
  const jobInfo = await fetchJobData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <form className="w-full max-w-5xl p-14 text-sm flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold">Skapa ny plan</h1>
        <div className="flex gap-2 my-4">
          <Input label="Förnamn" placeholder="Förnamn" />
          <Input label="Efternmamn" placeholder="Efternman" />
        </div>
        <FilterList jobs={jobInfo} />
      </form>
    </main>
  )
}
