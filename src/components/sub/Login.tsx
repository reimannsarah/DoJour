import { useState } from 'react'
import { User, loginUser } from '../../service/apiService'

interface LoginProps { 
  onSubmit: (user: User) => void
}


const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const user = await loginUser({email, password})
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', user.token)
      props.onSubmit(user);
    } catch (error) {
      setError((error as Error).message)
    }
  }
  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
        name="email"
        type="email" 
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        <input 
        name="password"
        type="password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"/>
        <input 
        type="submit" 
        value="Login"
        />
      </form>
    </div>
  )
}

export default Login