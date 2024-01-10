import { useState } from "react";
import TextEntry from "../atoms/TextEntry";

function Control () {
  const [home, sethome] = useState(true);

  function handlePost() {
    
  }

  function handleHome() {
    sethome(true);
  }

  let current;

  if(home) {
    current =
    <div>
      <TextEntry />
      <button onClick={handleHome}>Home</button>
      </div>
  }

  return (
    <>
      {current}
    </>
  )
}

export default Control;