import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const ConvexDebug: React.FC = () => {
  const leaders = useQuery(api.pmLeaders.getAll);

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded mb-4">
      <h3 className="font-bold mb-2">Convex Debug Info:</h3>
      <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
        {JSON.stringify(leaders, null, 2)}
      </pre>
    </div>
  );
};

export default ConvexDebug;