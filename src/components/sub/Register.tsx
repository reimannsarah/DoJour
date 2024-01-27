import { registerUser, User } from "../../service/apiService";
import { useState } from "react";

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
      props.onSubmit(user);
    } catch (error) {
      setError((error as Error).message);
    }
    console.log("handleSubmit finished");
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          type="text"
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          type="text"
          placeholder="Last Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
