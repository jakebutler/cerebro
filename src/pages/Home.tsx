import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import LeaderCard from '@/components/LeaderCard';
import AddLeaderModal from '@/components/AddLeaderModal';
import ConvexDebug from '@/components/ConvexDebug';

// Debug the API import
console.log('API object:', api);
console.log('API pmLeaders:', api.pmLeaders);
console.log('API pmLeaders.getAll:', api.pmLeaders.getAll);

function Home() {
  const leaders = useQuery(api.pmLeaders.getAll);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Debug logging
  console.log('Leaders from Convex:', leaders);
  console.log('Leaders type:', typeof leaders);
  console.log('Leaders is array:', Array.isArray(leaders));

  const filteredLeaders = leaders?.filter((leader) =>
    leader.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  console.log('Filtered leaders:', filteredLeaders);

  if (leaders === undefined) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <p>Waiting for data from Convex...</p>
      </div>
    );
  }

  if (leaders === null) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Failed to load data from Convex.</p>
      </div>
    );
  }

  if (!Array.isArray(leaders)) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Data format issue. Received: {JSON.stringify(leaders)}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Debug Section */}
      <ConvexDebug />
      
      {/* Hero Section */}
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">Cerebro</h1>
        <p className="text-lg text-secondary mt-2">A structured database of influential people in product management</p>
      </section>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        className="border rounded p-2 mb-4 w-full"
      />

      {/* Add Leader Modal */}
      <AddLeaderModal />

      {/* Leader List */}
      {filteredLeaders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeaders.map((leader) => (
            <LeaderCard key={leader._id} name={leader.name} skills={leader.skills} bio={leader.bio} />
          ))}
        </div>
      ) : (
        <p>No PM leaders found. Connection might have failed.</p>
      )}
    </div>
  );
}

export default Home;