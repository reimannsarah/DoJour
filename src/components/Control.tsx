import { useState } from "react";
import TextEntry from "./sub/TextEntry";
import Landing from "./main/Landing";

function Control() {
  const [home, sethome] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  function handleHome() {
    sethome(true);
  }

  function handleLogin() {
    setisLoggedIn(true);
  }

  let current;

  if (!isLoggedIn) {
    current = <Landing onLogin={handleLogin} />;
  } else if (home) {
    current = (
      <div>
        <TextEntry />
        <button onClick={handleHome}>Home</button>
      </div>
    );
  }

  return <>{current}</>;
}

export default Control;
