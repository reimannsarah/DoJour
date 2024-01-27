import Login from '../sub/Login'
import Register from '../sub/Register'
import { User } from '../../service/apiService'

interface LandingProps {
  onLogin: (user: User) => void
}

const Landing = (props: LandingProps) => {
  return (
    <div>
      <Login onSubmit={props.onLogin}/>
      <Register onSubmit={props.onLogin}/>
    </div>
  )
}

export default Landing