import Header from './components/header'
import PlanForm from './components/planForm'
import { JobInfo } from './types/types'

type Taxonomy = {
  'taxonomy/id': string
  'taxonomy/preferred-label': string
}
export const maxDuration = 60

const fetchJobData = async () => {
  try {
    const res = await fetch(
      'https://taxonomy.api.jobtechdev.se/v1/taxonomy/main/concepts?type=job-title&version=latest',
      { next: { revalidate: false } }
    )
    const taxonomy: Taxonomy[] = await res.json()
    const jobInfo: JobInfo[] = taxonomy.map((job) => ({
      id: job['taxonomy/id'],
      title: job['taxonomy/preferred-label'],
      education: false,
      experience: false,
    }))
    return jobInfo
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Home() {
  const jobInfo = await fetchJobData()
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main>
        <PlanForm jobInfo={jobInfo} />
      </main>
    </div>
  )
}
