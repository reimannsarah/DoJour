import { useContext, useEffect, useState } from "react";
import { UserContext } from "../main/UserContext";
import { Entry, getEntriesByUserId } from "../../service/apiService";
import { motion } from "framer-motion";
import { slideInFromLeft } from "../../../utils/motion";
import { deleteEntry } from "../../service/apiService";
import { TrashIcon } from "@heroicons/react/16/solid";

interface EntriesProps {
  lastSubmission: Date | null;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsOpen: boolean;
  setCurrentEntry: React.Dispatch<React.SetStateAction<Entry | null>>;
}

function Entries(props: EntriesProps) {
  const { user } = useContext(UserContext) || {};
  const [entries, setEntries] = useState<Entry[]>([]);

  const deleteAndFetchEntries = async (entryId: string) => {
    await deleteEntry(entryId);
    const updatedEntries = await getEntriesByUserId(user!.userId || "");
    setEntries(updatedEntries);
  };

  useEffect(() => {
    getEntriesByUserId(user!.userId || "")
      .then((entries) => setEntries(entries))
      .catch((error) => console.log(error));
  }, [user, props.lastSubmission, props.modalIsOpen]);

  return (
    <div className="text-white w-2/5 p-3 overflow-y-auto h-[900px]">
      {entries.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        entries.map((entry, index) => (
          <motion.div
            key={index}
            onClick={() => {
              props.setModalIsOpen(true);
              props.setCurrentEntry(entry);
            }}
            variants={slideInFromLeft(index * 0.3)}
            initial="hidden"
            animate="visible"
            className="m-4 p-3 bg-tertiary opacity-80 rounded-lg cursor-pointer"
          >
            <div className="flex flex-row justify-between">
              <h1 className="text-[25px] font-header text-darkTertiary">
                {entry.title}
              </h1>
              <p className="text-darkTertiary">{entry.date}</p>
            </div>
            <p>RE: {entry.subject}</p>
            <p>{entry.text.substring(0, 50)}...</p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteAndFetchEntries(entry!.entryId!);
              }}
              className="relative z-600"
            >
              <TrashIcon className="absolute h-5 w-5 bottom-0 right-0 text-darkTertiary cursor-pointer" />
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default Entries;
