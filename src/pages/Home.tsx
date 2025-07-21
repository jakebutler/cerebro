import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Button from '@/components/ui/button';

function Home() {
  // Fetch PM leaders
  const leaders = useQuery(api.pmLeaders.getAll);

  if (leaders === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">PM Leaders</h1>
      <Button onClick={() => console.log('Add Leader')} className="mb-4">
        Add Leader
      </Button>
      {leaders.length > 0 ? (
        <ul className="space-y-2">
          {leaders.map((leader: any) => (
            <li key={leader._id} className="p-4 bg-white shadow rounded-lg">
              {leader.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No PM leaders found. Connection might have failed.</p>
      )}
    </div>
  );
}

export default Home;