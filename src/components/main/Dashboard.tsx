import { useState, useContext } from "react";
import Entries from "../sub/Entries";
import TextEntry from "../sub/TextEntry";
import { UserContext } from "./UserContext";
import Button from "../sub/Button";
import {
  Entry,
  deleteEntry,
  getEntriesByUserId,
} from "../../service/apiService";
import Modal from "react-modal";
import { XCircleIcon } from "@heroicons/react/16/solid";

export const Dashboard = () => {
  const user = useContext(UserContext);
  const [lastSubmission, setLastSubmission] = useState<Date | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Entry | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmission = () => {
    setLastSubmission(new Date());
  };

  return (
    <div className="relative flex flex-col mt-10">
      <Button />
      <div className="flex flex-row justify-evenly">
        <Entries
          lastSubmission={lastSubmission}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setCurrentEntry={setCurrentEntry}
        />
          <TextEntry
            currentEntry={currentEntry}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            onSubmission={handleSubmission}
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
            setCurrentEntry={setCurrentEntry}
          />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="relative bg-tertiary w-3/5 h-3/5 my-44 mx-auto rounded-lg p-10"
        >
          <XCircleIcon
            className="absolute w-5 h-5 right-0 top-0 text-darkTertiary m-3 cursor-pointer"
            onClick={() => setModalIsOpen(false)}
          />
          <div className="flex flex-row justify-between">
            <h1 className="font-header text-5xl text-darkTertiary">
              {currentEntry?.title}
            </h1>
            <p className="text-darkTertiary">{currentEntry?.date}</p>
          </div>
          <p className="p-10 text-white">{currentEntry?.text}</p>
          <button
            onClick={() => {
              deleteEntry(currentEntry!.entryId!);
              setModalIsOpen(false);
              getEntriesByUserId(user!.user!.userId!);
            }}
            className="absolute bg-secondary text-white rounded-lg p-3 right-10 bottom-10"
          >
            Delete
          </button>
          <button onClick={() => {
            setCurrentEntry(currentEntry);
            setIsEditing(true);
            setModalIsOpen(false);
          }}>Update</button>
        </Modal>
      </div>
    </div>
  );
};
