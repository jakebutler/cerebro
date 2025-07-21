import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery, useMutation } from 'convex/react';
// import { api } from '../lib/api-placeholder';
import type { SuggestedEdit } from '../lib/types';

// Helper to format date from timestamp
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

// Mock suggested edits data
const mockSuggestedEdits: Partial<SuggestedEdit>[] = [
  {
    _id: 'edit1' as any,
    pmId: 'placeholder1' as any,
    field: 'bio',
    suggestedValue: 'Former PM at Airbnb; author of the popular Lenny\'s Newsletter, host of Lenny\'s Podcast, and angel investor.',
    suggestedBy: 'Contributor 1',
    suggestedAt: Date.now() - 3600000, // 1 hour ago
    status: 'pending'
  },
  {
    _id: 'edit2' as any,
    pmId: 'placeholder2' as any,
    field: 'skills',
    suggestedValue: 'Product discovery, org design, product culture, leadership',
    suggestedBy: 'Contributor 2',
    suggestedAt: Date.now() - 86400000, // 1 day ago
    status: 'approved'
  },
  {
    _id: 'edit3' as any,
    pmId: 'placeholder3' as any,
    field: 'podcast',
    suggestedValue: 'https://examplepodcast.com/johnzeratsky',
    suggestedBy: 'Contributor 3',
    suggestedAt: Date.now() - 172800000, // 2 days ago
    status: 'rejected'
  }
];

const SuggestedEdits = () => {
  // const suggestedEdits = useQuery(api.suggestedEdits.getAll);
  // const approveSuggestion = useMutation(api.suggestedEdits.approve);
  // const rejectSuggestion = useMutation(api.suggestedEdits.reject);
  const [suggestedEdits, setSuggestedEdits] = useState(mockSuggestedEdits as SuggestedEdit[]);
  const [filter, setFilter] = useState('');

  const handleApprove = async (id: any) => {
    try {
      // await approveSuggestion({
      //   id,
      //   approvedBy: 'Current User',
      // });
      
      // Update local state to simulate approval
      setSuggestedEdits(
        suggestedEdits.map(edit => 
          edit._id === id ? { ...edit, status: 'approved' } : edit
        )
      );
      
      alert(`Approved edit with ID ${id} (mock)`);
    } catch (error) {
      console.error('Error approving suggestion:', error);
      alert('Failed to approve. Please try again.');
    }
  };

  const handleReject = async (id: any) => {
    try {
      // await rejectSuggestion({
      //   id,
      //   rejectedBy: 'Current User',
      // });
      
      // Update local state to simulate rejection
      setSuggestedEdits(
        suggestedEdits.map(edit => 
          edit._id === id ? { ...edit, status: 'rejected' } : edit
        )
      );
      
      alert(`Rejected edit with ID ${id} (mock)`);
    } catch (error) {
      console.error('Error rejecting suggestion:', error);
      alert('Failed to reject. Please try again.');
    }
  };

  const filteredEdits = filter
    ? suggestedEdits?.filter((edit: SuggestedEdit) => 
        edit.field.includes(filter) || 
        edit.suggestedBy.toLowerCase().includes(filter.toLowerCase()) ||
        edit.status.includes(filter.toLowerCase())
      )
    : suggestedEdits;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Suggested Edits</h1>
          <p className="mt-2 text-sm text-gray-700">
            Review, approve, or reject edits suggested by contributors.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Filter by field, status, or contributor..."
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
                        Field
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Suggested Value
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Suggested By
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredEdits ? (
                      filteredEdits.map((edit: SuggestedEdit) => (
                        <tr key={edit._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {edit.field}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {typeof edit.suggestedValue === 'string' ? (
                              edit.suggestedValue.startsWith('http') ? (
                                <a href={edit.suggestedValue} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                                  {edit.suggestedValue}
                                </a>
                              ) : (
                                edit.suggestedValue
                              )
                            ) : (
                              JSON.stringify(edit.suggestedValue)
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {edit.suggestedBy}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDate(edit.suggestedAt)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            {edit.status === 'pending' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            ) : edit.status === 'approved' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Approved
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Rejected
                              </span>
                            )}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {edit.status === 'pending' && (
                              <div className="flex justify-end">
                                <button
                                  onClick={() => handleApprove(edit._id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(edit._id)}
                                  className="ml-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                            <Link
                              to={`/profile/${edit.pmId}`}
                              className="ml-3 inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              View Profile
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          Loading suggested edits...
                        </td>
                      </tr>
                    )}
                    {filteredEdits && filteredEdits.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          {filter ? 'No results match your filter.' : 'No suggested edits at this time.'}
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

export default SuggestedEdits;