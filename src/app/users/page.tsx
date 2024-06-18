import User from '../components/user'
import { getUsersAction } from './actions'

export default async function Users() {
  const data = await getUsersAction()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <ul className="w-1/2">
        {data.map((user) => (
          <User
            key={user.id}
            name={user.name}
            age={user.age}
            email={user.email}
          />
        ))}
      </ul>
    </main>
  )
}
