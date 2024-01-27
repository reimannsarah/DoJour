import { useContext, useState } from "react";
import { UserContext } from "../main/UserContext";
import { Entry, createEntry } from "../../service/apiService";

const TextEntry = () => {
  const { user } = useContext(UserContext) || {};
  const [entry, setEntry] = useState<Entry>({
    text: "",
    title: "",
    date: "",
    subject: "",
    userId: user?.id || "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    console.log(entry)
    e.preventDefault();

    try {
      await createEntry(entry);
      setEntry({
        text: "",
        title: "",
        date: "",
        subject: "",
        userId: user?.id || "",
      });
    } catch (err) {
      console.error(error);
      setError("Failed to create entry");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  return (
    <div className="text-form">
      <form onSubmit={handleSave} className="text-entry">
        <input type="text" name="title" value={entry.title} onChange={handleChange} placeholder="These are my thoughts today" />
        <input type="text" name="subject" value={entry.subject} onChange={handleChange} placeholder="Worms and other things" />
        <input type="date" name="date" value={entry.date}onChange={handleChange}/>
        <textarea
          name="text"
          value={entry.text}
          onChange={handleChange}
          placeholder="Dear Diary, today I stuffed a bunch of olives into the DVD player and then I remembered that I don't have a DVD player."
          cols={100}
          rows={50}
        ></textarea>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default TextEntry;
