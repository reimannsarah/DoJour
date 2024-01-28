import { useContext, useState } from "react";
import { UserContext } from "../main/UserContext";
import { Entry, createEntry } from "../../service/apiService";

interface TextEntryProps {
  onSubmission: () => void;
}

const TextEntry = (props: TextEntryProps) => {

  const { user } = useContext(UserContext) || {};
  console.log(user?.userId);
  const [entry, setEntry] = useState<Entry>({
    text: "",
    title: "",
    date: "",
    subject: "",
    userId: user!.userId || "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(entry);
    console.log(user)

    try {
      await createEntry(entry);
      setEntry({
        text: "",
        title: "",
        date: "",
        subject: "",
        userId: user!.userId!,
      });
      console.log(entry);
      console.log("Entry created");
    } catch (err) {
      console.error(error);
      setError("Failed to create entry");
    }
    props.onSubmission();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  return (
    <div className="m-10">
      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <input
          className="p-2 rounded-lg"
          type="text"
          name="title"
          value={entry.title}
          onChange={handleChange}
          placeholder="These are my thoughts today"
        />
        <div className="flex flex-row gap-5">
          <input
            className="p-2 rounded-lg"
            type="text"
            name="subject"
            value={entry.subject}
            onChange={handleChange}
            placeholder="Worms and other things"
          />
          <input
            className="p-2 rounded-lg"
            type="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
          />
        </div>
        <textarea
          className="p-2 rounded-lg"
          name="text"
          value={entry.text}
          onChange={handleChange}
          placeholder="Dear Diary, today I stuffed a bunch of olives into the DVD player and then I remembered that I don't have a DVD player."
          cols={100}
          rows={25}
        ></textarea>
        <input type="submit" className="text-white"></input>
      </form>
    </div>
  );
};

export default TextEntry;
