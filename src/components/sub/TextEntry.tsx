import { useContext, useState } from "react";
import { UserContext } from "../main/UserContext";
import { Entry, createEntry } from "../../service/apiService";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion";

type TextEntryProps = {
  onSubmission: () => void;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsOpen: boolean;
  setCurrentEntry: React.Dispatch<React.SetStateAction<Entry | null>>;
};

const TextEntry = (props: TextEntryProps) => {
  const { user } = useContext(UserContext) || {};
  const [entry, setEntry] = useState<Entry>({
    text: "",
    title: "",
    date: "",
    subject: "",
    userId: user!.userId!,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(entry);
    console.log(user);

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
    <motion.div 
    variants={fadeIn(0.7)}
    initial='hidden'
    animate='visible'
    className="w-4/5 p-10"
    >
      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <input
          className="p-5 rounded-lg bg-transparent text-[50px] text-white text-center font-header"
          type="text"
          name="title"
          value={entry.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <div className="flex flex-row justify-evenly gap-10">
          <input
            className="p-2 rounded-lg w-full bg-secondary opacity-70 text-white text-[30px] text-center placeholder-white font-header"
            type="text"
            name="subject"
            value={entry.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
          <input
            className="p-2 rounded-lg w-full bg-secondary opacity-70 text-white text-[20px] text-center font-header"
            type="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
          />
        </div>
        <div className="paper w-full opacity-80">
          <div className="paper-content">
            <textarea
              className="p-2 rounded-lg"
              name="text"
              value={entry.text}
              onChange={handleChange}
              placeholder="Dear Diary, today I stuffed a bunch of olives into the DVD player and then I remembered that I don't have a DVD player."
            ></textarea>
          </div>
        </div>
        <input type="submit" value="Save to list" className="text-white opacity-70 bg-tertiary w-2/5 my-0 mx-auto p-2 rounded-lg font-header cursor-pointer"></input>
      </form>
    </motion.div>
  );
};

export default TextEntry;
