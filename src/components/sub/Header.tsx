import { useContext } from 'react'
import { UserContext } from '../main/UserContext'

export const Header = () => {
  const { user } = useContext(UserContext) ?? {};

  return (
    <div className='mb-10'>
      <h1 className='absolute text-white font-header text-4xl mb-5 left-24 '>Hello, {user!.firstName!}</h1>
    </div>
  )
}

export default Header
