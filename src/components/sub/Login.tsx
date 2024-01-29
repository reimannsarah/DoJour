import { useState } from "react";
import { User, loginUser } from "../../service/apiService";
import { motion } from "framer-motion";
import { slideInFromLeft } from "../../../utils/motion";

interface LoginProps {
  onSubmit: (user: User) => void;
}

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("name", user.firstName);
      props.onSubmit(user);
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <motion.div
      variants={slideInFromLeft(0.4)}
      initial="hidden"
      animate="visible"
    >
      {error && <p>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-secondary py-10 px-24 flex flex-col gap-3 items-center w-2/5 mx-auto rounded-lg"
      >
        <h1>{error || "Have an account?"}</h1>
        <input
          className="bg-primary p-2 rounded-lg w-full text-white"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-primary p-2 rounded-lg w-full text-white"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          className="border-2 border-primary px-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white"
          type="submit"
          value="Login"
        />
      </form>
    </motion.div>
  );
};

export default Login;
