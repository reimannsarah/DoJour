import { registerUser } from "../../service/apiService";
import { useState } from "react";

interface RegisterProps {
  onSubmit: () => void;
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
      const user = await registerUser({ firstName, lastName, email, password });
      console.log(user)
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      props.onSubmit();
    } catch (error) {
      setError((error as Error).message);
      console.log(error)
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          name="firstName"
          type="text"
          placeholder="First Name"
        />
        <input value={lastName} onChange={e => setLastName(e.target.value)} name="lastName" type="text" placeholder="Last Name" />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
        type="submit" 
        value="Register" 
        />
      </form>
    </div>
  );
};

export default Register;
