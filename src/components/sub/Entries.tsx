import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../main/UserContext';
import { Entry, getEntriesByUserId } from '../../service/apiService';

interface EntriesProps {
  lastSubmission: Date | null;
}

function Entries( props: EntriesProps ) {
  const { user } = useContext(UserContext) || {};
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getEntriesByUserId(user!.userId || "")
      .then((entries) => setEntries(entries))
      .catch((error) => console.log(error));
  }, [user, props.lastSubmission]);

  return (
    <div className='text-white'>
      {entries.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        entries.map((entry, index) => (
          <div key={index}>
            <h1>{entry.title}</h1>
          </div>
        ))
      )}
    </div>
  );
}

export default Entries;