import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../lib/api-placeholder';

const AddPerson = () => {
  const navigate = useNavigate();
  // const addPMLeader = useMutation(api.pmLeaders.add);
  const addPMLeader = useMutation(api.pmLeaders.add as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    bio: '',
    website: '',
    blogs: [''],
    twitter: '',
    linkedin: '',
    other_social: [''],
    podcast: '',
    needs_verification: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const addArrayItem = (field: string) => {
    const newArray = [...formData[field as keyof typeof formData] as string[], ''];
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Process form data
      const processedData = {
        ...formData,
        // Filter out empty strings from arrays
        blogs: formData.blogs.filter(item => item.trim() !== ''),
        other_social: formData.other_social.filter(item => item.trim() !== ''),
        // Convert empty strings to null for nullable fields
        twitter: formData.twitter.trim() || null,
        linkedin: formData.linkedin.trim() || null,
        podcast: formData.podcast.trim() || null,
      };
      
      // In a real app, we would call Convex
      // const result = await addPMLeader(processedData);
      
      // For now, just show what would be added
      console.log('Would add PM leader:', processedData);
      alert('Person added successfully! (mock)');
      
      // Navigate back to home
      navigate('/');
      
    } catch (error) {
      console.error('Error adding PM leader:', error);
      alert('Failed to add new person. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Add New Person
          </h2>
          <p className="mt-1 text-gray-500">Create a new entry for a PM thought leader</p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name*
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills*
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    required
                    value={formData.skills}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio*
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    required
                    value={formData.bio}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Brief description of their background and expertise.</p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website*
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="website"
                    id="website"
                    required
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Blogs
                </label>
                {formData.blogs.map((blog, index) => (
                  <div key={index} className="mt-1 flex">
                    <input
                      type="url"
                      value={blog}
                      onChange={(e) => handleArrayChange('blogs', index, e.target.value)}
                      placeholder="https://example.com/blog"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {formData.blogs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('blogs', index)}
                        className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('blogs')}
                  className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Blog
                </button>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="twitter"
                    id="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="https://x.com/username"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="linkedin"
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Other Social Media
                </label>
                {formData.other_social.map((social, index) => (
                  <div key={index} className="mt-1 flex">
                    <input
                      type="url"
                      value={social}
                      onChange={(e) => handleArrayChange('other_social', index, e.target.value)}
                      placeholder="https://example.com/profile"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {formData.other_social.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('other_social', index)}
                        className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('other_social')}
                  className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Social Media
                </button>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="podcast" className="block text-sm font-medium text-gray-700">
                  Podcast
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="podcast"
                    id="podcast"
                    value={formData.podcast}
                    onChange={handleChange}
                    placeholder="https://example.com/podcast"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPerson;