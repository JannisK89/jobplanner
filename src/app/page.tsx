import Link from 'next/link'
import { JobInfo } from './types/types'
import FilterList from './components/filterList'

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
      <div className="w-full max-w-lg text-sm flex flex-col gap-4 ">
        <Link
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          href="/users"
        >
          Go To Users
        </Link>
        <Link
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          href="/users/add"
        >
          Go To Add Users
        </Link>
        <FilterList jobs={jobInfo} />
      </div>
    </main>
  )
}
