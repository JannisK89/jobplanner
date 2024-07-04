import { JobInfo, JobInfoWithOpenPositions } from '../types/types'

type PositionsResponse = { positions: number }

const openPositions = async (
  jobs: JobInfo[]
): Promise<JobInfoWithOpenPositions[]> => {
  const updatedJobs = []
  for await (const job of jobs) {
    const response = await fetch(
      `https://jobsearch.api.jobtechdev.se/search?occupation-name=${job.id}&offset=0&limit=0`
    )
    const responseJson: PositionsResponse = await response.json()
    updatedJobs.push({ ...job, openPositions: responseJson.positions })
  }
  return updatedJobs
}

export default openPositions
