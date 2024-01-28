import React, { useContext } from 'react';
import { UserContext } from '../main/UserContext';

const Button: React.FC = () => {
  const userContext = useContext(UserContext);

  const handleClick = () => {
    if (userContext) {
      userContext.handleLogout();
    }
  };

  return (
    <button onClick={handleClick} className='text-white absolute right-0 top-0 mx-10 font-body'>
      Logout
    </button>
  );
};

export default Button;