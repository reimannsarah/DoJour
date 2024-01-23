interface LoginProps { 
  onSubmit: () => void
}

const Login = (props: LoginProps) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <input type="text" placeholder="Username"/>
        <input type="password" placeholder="Password"/>
        <input type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login