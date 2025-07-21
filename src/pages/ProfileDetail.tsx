import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Comment out convex imports until we have Convex set up
// import { useQuery, useMutation } from 'convex/react';
// import { api } from '../lib/api-placeholder';
import type { PMLeader, Id } from '../types/types';

// Placeholder data for development
const mockPMLeader: PMLeader = {
  _id: 'placeholder1' as any,
  _creationTime: Date.now(),
  name: 'Lenny Rachitsky',
  skills: 'Product strategy, growth, consumer SaaS',
  bio: "Former PM at Airbnb; author of the popular Lenny's Newsletter and host of Lenny's Podcast.",
  website: 'https://www.lennysnewsletter.com',
  blogs: ['https://www.lennysnewsletter.com'],
  twitter: 'https://x.com/lennysan',
  linkedin: 'https://www.linkedin.com/in/lennyrachitsky/',
  other_social: [],
  podcast: 'https://www.lennysnewsletter.com/podcast',
  needs_verification: ['twitter'],
  history: [
    {
      field: 'bio',
      previousValue: 'Former PM at Airbnb',
      newValue: 'Former PM at Airbnb; author of the popular Lenny\'s Newsletter and host of Lenny\'s Podcast.',
      editedBy: 'Admin',
      editedAt: Date.now() - 86400000 // 1 day ago
    }
  ]
};


// Helper to format date from timestamp
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const pmLeader = useQuery(api.pmLeaders.getById, { id: id as Id<"pmLeaders"> });
  // const update = useMutation(api.pmLeaders.update);
  // const verifyField = useMutation(api.pmLeaders.verifyField);
  
  // Use mock data for now
  const pmLeader = mockPMLeader;
  
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  const startEdit = (field: string, value: any) => {
    setEditMode({ ...editMode, [field]: true });
    setEditValues({ ...editValues, [field]: value });
  };

  const cancelEdit = (field: string) => {
    setEditMode({ ...editMode, [field]: false });
    const newEditValues = { ...editValues };
    delete newEditValues[field];
    setEditValues(newEditValues);
  };

  const saveEdit = async (field: string) => {
    const value = editValues[field];
    try {
      // Mock update in local state
      // In the real app, this would call Convex
      // await update({
      //   id: pmLeader._id,
      //   field,
      //   value,
      //   editor: 'Current User',
      // });
      
      // For now, just update UI state
      alert(`Updated ${field} to ${value} (mock)`);
      setEditMode({ ...editMode, [field]: false });
      const newEditValues = { ...editValues };
      delete newEditValues[field];
      setEditValues(newEditValues);
    } catch (error) {
      console.error('Error updating field:', error);
      alert('Failed to update. Please try again.');
    }
  };

  const verifyFieldHandler = async (field: string) => {
    try {
      // Mock verify in local state
      // In the real app, this would call Convex
      // await verifyField({
      //   id: pmLeader._id,
      //   field,
      //   verifier: 'Current User',
      // });
      
      // For now, just show a message
      alert(`Verified ${field} (mock)`);
    } catch (error) {
      console.error('Error verifying field:', error);
      alert('Failed to verify. Please try again.');
    }
  };

  // Helper for rendering edit controls
  const renderEditControls = (field: string, currentValue: any) => {
    if (editMode[field]) {
      return (
        <div className="mt-2 flex items-center space-x-2">
          <button
            onClick={() => saveEdit(field)}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
          <button
            onClick={() => cancelEdit(field)}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => startEdit(field, currentValue)}
        className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Edit
      </button>
    );
  };

  // Helper for rendering verification badge
  const renderVerificationBadge = (field: string) => {
    if (pmLeader.needs_verification.includes(field)) {
      return (
        <div className="ml-2 flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Needs Verification
          </span>
          <button
            onClick={() => verifyFieldHandler(field)}
            className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Verify
          </button>
        </div>
      );
    }
    return (
      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Verified
      </span>
    );
  };

  // Special editor for array fields
  const renderArrayEditor = (field: string, value: string[]) => {
    if (!editMode[field]) {
      return (
        <ul className="mt-1 list-disc pl-5">
          {value.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item.startsWith('http') ? (
                <a href={item} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                  {item}
                </a>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="mt-1">
        {editValues[field].map((item: string, index: number) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newValues = [...editValues[field]];
                newValues[index] = e.target.value;
                setEditValues({ ...editValues, [field]: newValues });
              }}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <button
              onClick={() => {
                const newValues = [...editValues[field]];
                newValues.splice(index, 1);
                setEditValues({ ...editValues, [field]: newValues });
              }}
              className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setEditValues({ ...editValues, [field]: [...editValues[field], ''] });
          }}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Item
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {pmLeader.name}
          </h2>
          <p className="mt-1 text-gray-500">{pmLeader.skills}</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and social media links.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode.name ? (
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  pmLeader.name
                )}
                <div className="flex items-center">
                  {renderEditControls('name', pmLeader.name)}
                  {renderVerificationBadge('name')}
                </div>
              </dd>
            </div>
            
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Skills</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode.skills ? (
                  <input
                    type="text"
                    value={editValues.skills}
                    onChange={(e) => setEditValues({ ...editValues, skills: e.target.value })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  pmLeader.skills
                )}
                <div className="flex items-center">
                  {renderEditControls('skills', pmLeader.skills)}
                  {renderVerificationBadge('skills')}
                </div>
              </dd>
            </div>
            
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode.bio ? (
                  <textarea
                    value={editValues.bio}
                    onChange={(e) => setEditValues({ ...editValues, bio: e.target.value })}
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  pmLeader.bio
                )}
                <div className="flex items-center">
                  {renderEditControls('bio', pmLeader.bio)}
                  {renderVerificationBadge('bio')}
                </div>
              </dd>
            </div>
            
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode.website ? (
                  <input
                    type="url"
                    value={editValues.website}
                    onChange={(e) => setEditValues({ ...editValues, website: e.target.value })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  <a href={pmLeader.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                    {pmLeader.website}
                  </a>
                )}
                <div className="flex items-center">
                  {renderEditControls('website', pmLeader.website)}
                  {renderVerificationBadge('website')}
                </div>
              </dd>
            </div>
            
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Blogs</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {renderArrayEditor('blogs', pmLeader.blogs)}
                <div className="flex items-center mt-2">
                  {renderEditControls('blogs', pmLeader.blogs)}
                  {renderVerificationBadge('blogs')}
                </div>
              </dd>
            </div>
            
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Twitter</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode.twitter ? (
                  <input
                    type="url"
                    value={editValues.twitter === null ? '' : editValues.twitter}
                    onChange={(e) => setEditValues({ ...editValues, twitter: e.target.value || null })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  pmLeader.twitter ? (
                    <a href={pmLeader.twitter} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                      {pmLeader.twitter}
                    </a>
                  ) : (
                    <span className="text-gray-500">Not provided</span>
                  )
                )}
                <div className="flex items-center">
                  {renderEditControls('twitter', pmLeader.twitter)}
                  {renderVerificationBadge('twitter')}
                </div>
              </dd>
            </div>
            
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode.linkedin ? (
                  <input
                    type="url"
                    value={editValues.linkedin === null ? '' : editValues.linkedin}
                    onChange={(e) => setEditValues({ ...editValues, linkedin: e.target.value || null })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  pmLeader.linkedin ? (
                    <a href={pmLeader.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                      {pmLeader.linkedin}
                    </a>
                  ) : (
                    <span className="text-gray-500">Not provided</span>
                  )
                )}
                <div className="flex items-center">
                  {renderEditControls('linkedin', pmLeader.linkedin)}
                  {renderVerificationBadge('linkedin')}
                </div>
              </dd>
            </div>
            
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Podcast</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode.podcast ? (
                  <input
                    type="url"
                    value={editValues.podcast === null ? '' : editValues.podcast}
                    onChange={(e) => setEditValues({ ...editValues, podcast: e.target.value || null })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  pmLeader.podcast ? (
                    <a href={pmLeader.podcast} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                      {pmLeader.podcast}
                    </a>
                  ) : (
                    <span className="text-gray-500">Not provided</span>
                  )
                )}
                <div className="flex items-center">
                  {renderEditControls('podcast', pmLeader.podcast)}
                  {renderVerificationBadge('podcast')}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* History Section */}
      {pmLeader.history.length > 0 && (
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Edit History</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Record of all changes made to this profile.</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {pmLeader.history.map((historyItem: {
                field: string;
                previousValue: any;
                newValue: any;
                editedAt: number;
                editedBy: string;
              }, index: number) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Field: <span className="font-bold">{historyItem.field}</span>
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(historyItem.editedAt)}</p>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Changed from: <span className="font-mono">{JSON.stringify(historyItem.previousValue)}</span></p>
                    <p>Changed to: <span className="font-mono">{JSON.stringify(historyItem.newValue)}</span></p>
                    <p className="mt-1">Edited by: {historyItem.editedBy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;