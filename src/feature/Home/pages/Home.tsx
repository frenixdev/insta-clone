import { useAuth } from "../../auth/context/useAuthContext"

const Home = () => {
  const {user} = useAuth()
  if (!user) return <></>
  return (
    <div>
      <p>
        {user.username}
        hello
      </p>
    </div>
  )
}

export default Home
