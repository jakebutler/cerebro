import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

function Home() {
  // Ping Convex to get all PM leaders
  const leaders = useQuery(api.pmLeaders.getAll);

  if (leaders === undefined) {
    // Data is still loading
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>PM Leaders</h1>
      {leaders.length > 0 ? (
        <ul>
          {leaders.map((leader: any) => (
            <li key={leader._id}>{leader.name}</li>
          ))}
        </ul>
      ) : (
        <p>No PM leaders found. Connection might have failed.</p>
      )}
    </div>
  );
}
export default Home;