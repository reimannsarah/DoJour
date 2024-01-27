import Login from "../sub/Login";
import Register from "../sub/Register";
import { User } from "../../service/apiService";

interface LandingProps {
  onLogin: (user: User) => void;
}

const Landing = (props: LandingProps) => {
  return (
    <div className="flex flex-col gap-10 mt-[150px]">
      <div className="w-max my-0 mx-auto">
        <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
          Dear diary...
        </h1>
      </div>
      <Login onSubmit={props.onLogin} />
      <Register onSubmit={props.onLogin} />
    </div>
  );
};

export default Landing;
