import "./App.css";
import LandingPage from "./components/main/Landing";
import { Dashboard } from "./components/main/Dashboard";
import { UserContext } from "./components/main/UserContext";
import { useState, useEffect } from "react";
import { User } from "./service/apiService";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    if (user.token) {
      localStorage.setItem("token", user.token);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, handleLogin, handleLogout }}>
      {!isLoggedIn ? <LandingPage onLogin={handleLogin} /> : <Dashboard />}
    </UserContext.Provider>
  );
}

export default App;