import "./App.css";
import LandingPage from "./components/main/Landing";
import { Dashboard } from "./components/main/Dashboard";
import { UserContext } from "./components/main/UserContext";
import { useState, useEffect } from "react";
import { User } from "./service/apiService";
import Layout from "./components/main/Layout";
import Modal from "react-modal";

function App() {
  Modal.setAppElement('#root');
  const initialUser = {
    userId: "",
    username: "",
    password: "",
    token: "",
  };
  const [user, setUser] = useState<User>(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    if (user.token) {
      localStorage.setItem("token", user.token);
    }
  };

  const handleLogout = () => {
    setUser(initialUser);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, handleLogin, handleLogout }}
    >
      <Layout>
          {!isLoggedIn ? <LandingPage onLogin={handleLogin} /> : <Dashboard />}
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
