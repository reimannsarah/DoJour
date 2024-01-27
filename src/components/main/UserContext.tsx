import React from 'react';
import { User } from '../../service/apiService';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoggedIn: boolean;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
};

export const UserContext = React.createContext<UserContextType | null>(null);