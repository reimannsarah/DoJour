import { useContext, useState, useEffect } from "react";
import { UserContext } from "../main/UserContext";
import { Entry, createEntry, updateEntry } from "../../service/apiService";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion";

type TextEntryProps = {
  onSubmission: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  currentEntry: Entry | null;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsOpen: boolean;
  isEditing: boolean;
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

    try {
      await createEntry(entry);
      setEntry({
        text: "",
        title: "",
        date: "",
        subject: "",
        userId: user!.userId!,
      });
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


const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (props.currentEntry) {
    try {
      await updateEntry(props.currentEntry!.entryId!, { ...entry });
      props.onSubmission();
      props.setIsEditing(false);
      setEntry({
        text: "",
        title: "",
        date: "",
        subject: "",
        userId: user!.userId!,
      });

    } catch (error) {
      console.error('Error in updateEntry:', error);
      setError((error as Error).message);
    }
  }
};

  useEffect(() => {
    if (props.isEditing && props.currentEntry) {
      setEntry(props.currentEntry);
    } else {
      setEntry({
        text: "",
        title: "",
        date: "",
        subject: "",
        userId: user!.userId!,
      });
    }
  }, [props.isEditing, props.currentEntry, user]);

  return (
    <motion.div 
    variants={fadeIn(0.7)}
    initial='hidden'
    animate='visible'
    className="w-4/5 p-10"
    >
      <form onSubmit={props.isEditing ? handleUpdate : handleSave} className="flex flex-col gap-5">
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
        <div className="paper w-full opacity-90">
          <div className="paper-content">
            <textarea
              className="p-2 rounded-lg"
              name="text"
              value={entry.text}
              onChange={handleChange}
              placeholder="Dear Diary, today I took my dog for a walk around the block but the neighborhood seemed unfamiliar. After I fell into the first crater I knew something wasn't right. Somehow we had ended up on the moon!."
            ></textarea>
          </div>
        </div>
        <input type="submit" value="Save" className="text-white opacity-70 bg-tertiary w-2/5 my-0 mx-auto p-2 rounded-lg font-header cursor-pointer"></input>
      </form>
    </motion.div>
  );
};

export default TextEntry;
