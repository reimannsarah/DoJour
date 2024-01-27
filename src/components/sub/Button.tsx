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
    <button onClick={handleClick}>
      Logout
    </button>
  );
};

export default Button;