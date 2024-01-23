import React from 'react'
import Login from '../sub/Login'
import Register from '../sub/Register'

interface LandingProps {
  onLogin: () => void
}

const Landing = (props: LandingProps) => {
  return (
    <div>
      <Login onSubmit={props.onLogin}/>
      <Register />
    </div>
  )
}

export default Landing