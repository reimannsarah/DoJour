import Login from '../sub/Login'
import Register from '../sub/Register'

interface LandingProps {
  onLogin: () => void
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