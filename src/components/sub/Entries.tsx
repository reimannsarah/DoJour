import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../main/UserContext';
import { Entry, getEntriesByUserId } from '../../service/apiService';

function Entries() {
  const { user } = useContext(UserContext) || {};
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (user) {
      getEntriesByUserId(user?.id || '')
      .then((entries) => setEntries(entries));
      try {
        getEntriesByUserId(user?.id || '')
          .then((entries) => setEntries(entries))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  return (
    <div>
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