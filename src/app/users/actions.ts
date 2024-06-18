import { getAllUsers } from '@/db/queries'

export async function getUsersAction() {
  const data = await getAllUsers()
  return data
}
