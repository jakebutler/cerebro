import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery, useMutation } from 'convex/react';
// import { api } from '../lib/api-placeholder';
import type { VerificationQueueItem } from '../lib/types';

// Placeholder verification queue data
const mockVerificationQueue: VerificationQueueItem[] = [
  {
    id: 'placeholder1' as any,
    name: 'Lenny Rachitsky',
    field: 'twitter',
    value: 'https://x.com/lennysan'
  },
  {
    id: 'placeholder2' as any,
    name: 'Marty Cagan',
    field: 'linkedin',
    value: 'https://www.linkedin.com/in/cagan/'
  },
  {
    id: 'placeholder3' as any,
    name: 'John Zeratsky',
    field: 'linkedin',
    value: null
  }
];

const VerificationDashboard = () => {
  // const verificationQueue = useQuery(api.pmLeaders.getVerificationQueue);
  // const verifyField = useMutation(api.pmLeaders.verifyField);
  const [filter, setFilter] = useState('');
  const [verificationQueue, setVerificationQueue] = useState(mockVerificationQueue);

  const handleVerify = async (id: any, field: string) => {
    try {
      // Mock verification by removing item from the queue
      // await verifyField({
      //   id,
      //   field,
      //   verifier: 'Current User',
      // });
      
      // Update local state to simulate verification
      setVerificationQueue(verificationQueue.filter(item => 
        !(item.id === id && item.field === field)
      ));
      
      alert(`Verified ${field} for item with ID ${id} (mock)`);
    } catch (error) {
      console.error('Error verifying field:', error);
      alert('Failed to verify. Please try again.');
    }
  };

  const filteredQueue = filter
    ? verificationQueue?.filter((item: VerificationQueueItem) => 
        item.field.includes(filter) || item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : verificationQueue;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Verification Queue</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all fields that need verification across all PM leaders.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Filter by field or person..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Person
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Field
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Current Value
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredQueue ? (
                      filteredQueue.map((item: VerificationQueueItem, index: number) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <Link to={`/profile/${item.id}`} className="text-indigo-600 hover:text-indigo-900">
                              {item.name}
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.field}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {typeof item.value === 'string' ? (
                              item.value.startsWith('http') ? (
                                <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                                  {item.value}
                                </a>
                              ) : (
                                item.value
                              )
                            ) : (
                              JSON.stringify(item.value)
                            )}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleVerify(item.id, item.field)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                Verify
                              </button>
                              <Link
                                to={`/profile/${item.id}`}
                                className="ml-3 inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                          Loading verification queue...
                        </td>
                      </tr>
                    )}
                    {filteredQueue && filteredQueue.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                          {filter ? 'No results match your filter.' : 'No fields need verification! Great job!'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationDashboard;