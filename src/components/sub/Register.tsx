import { registerUser, User } from "../../service/apiService";
import { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromRight } from "../../../utils/motion";

interface RegisterProps {
  onSubmit: (user: User) => void;
}

const Register = (props: RegisterProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user: User = { firstName, lastName, email, password };
      const response = await registerUser(user);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("name", user!.firstName!);
      props.onSubmit(user);
    } catch (error) {
      setError((error as Error).message);
    }
    console.log("handleSubmit finished");
  };

  return (
    <motion.div
    variants={slideInFromRight(0.7)}
    initial='hidden'
    animate='visible'
    >
      <form
        onSubmit={handleSubmit}
        className="bg-secondary py-10 px-24 flex flex-col gap-3 items-center w-2/5 mx-auto rounded-lg"
      >
        <h1>{error || 'Register new user'}</h1>
        <input
          className="bg-primary p-2 rounded-lg w-full text-white"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          type="text"
          placeholder="First Name"
        />
        <input
          className="bg-primary p-2 rounded-lg w-full text-white"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          type="text"
          placeholder="Last Name"
        />
        <input
          className="bg-primary p-2 rounded-lg w-full text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          className="bg-primary p-2 rounded-lg w-full text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
          type="submit"
          value="Register"
          className="border-2 border-primary px-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white"
        />
      </form>
    </motion.div>
  );
};

export default Register;
