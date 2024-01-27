import { useState } from "react";
import Entries from "../sub/Entries";
import TextEntry from "../sub/TextEntry";
import Button from "../sub/Button";

export const Dashboard = () => {
  const [lastSubmission, setLastSubmission] = useState<Date | null>(null);

  const handleSubmission = () => {
    setLastSubmission(new Date());
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-evenly">
        <Entries lastSubmission={lastSubmission} />
        <TextEntry onSubmission={handleSubmission} />
      </div>
        <Button />
    </div>
  );
};
