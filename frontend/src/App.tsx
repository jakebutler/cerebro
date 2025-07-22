import { ConvexProvider, useQuery, useMutation } from "convex/react";
import { useState } from "react";
import convex from "./convex";
import { api } from "../convex/_generated/api";

function PmLeaderCard({ leader }: { leader: any }) {
  return (
    <div className="card">
      <div className="space-y-4">
        <div>
          <h3 className="title">{leader.name}</h3>
          <p className="subtitle">{leader.skills}</p>
        </div>
        
        <p className="bio">{leader.bio}</p>
        
        <div className="links">
          {leader.website && (
            <a href={leader.website} target="_blank" rel="noopener noreferrer" 
               className="link">
              Website
            </a>
          )}
          {leader.twitter && (
            <a href={leader.twitter} target="_blank" rel="noopener noreferrer" 
               className="link">
              Twitter
            </a>
          )}
          {leader.linkedin && (
            <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" 
               className="link">
              LinkedIn
            </a>
          )}
          {leader.podcast && (
            <a href={leader.podcast} target="_blank" rel="noopener noreferrer" 
               className="link">
              Podcast
            </a>
          )}
        </div>
        
        {leader.blogs && leader.blogs.length > 0 && (
          <div className="blogs">
            <p className="blogs-label">Blogs:</p>
            <div className="blog-links">
              {leader.blogs.map((blog: string, index: number) => (
                <a key={index} href={blog} target="_blank" rel="noopener noreferrer" 
                   className="blog-link">
                  Blog {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {leader.needs_verification && leader.needs_verification.length > 0 && (
          <div className="verification">
            <p className="verification-text">
              Needs verification: {leader.needs_verification.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchAndFilter({ searchTerm, onSearchChange, showAddModal, onShowAddModal }: {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showAddModal: boolean;
  onShowAddModal: (show: boolean) => void;
}) {
  return (
    <div className="search-section">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search PM leaders by name, skills, or bio..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => onShowAddModal(true)}
          className="add-button"
        >
          + Add Leader
        </button>
      </div>
    </div>
  );
}

function AddLeaderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const addLeader = useMutation(api.mutations.addPmLeader);
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    bio: '',
    website: '',
    twitter: '',
    linkedin: '',
    podcast: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addLeader({
        name: formData.name,
        skills: formData.skills,
        bio: formData.bio,
        website: formData.website,
        twitter: formData.twitter,
        linkedin: formData.linkedin || undefined,
        podcast: formData.podcast || undefined,
      });
      
      // Reset form and close modal on success
      setFormData({
        name: '',
        skills: '',
        bio: '',
        website: '',
        twitter: '',
        linkedin: '',
        podcast: ''
      });
      onClose();
    } catch (error) {
      console.error('Error adding leader:', error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New PM Leader</h2>
          <button onClick={onClose} className="modal-close">×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Skills *</label>
            <input
              type="text"
              required
              placeholder="e.g., Product strategy, growth, consumer SaaS"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Bio *</label>
            <textarea
              required
              placeholder="Brief description of their background and expertise"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="form-textarea"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Website</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Twitter</label>
            <input
              type="url"
              placeholder="https://x.com/username"
              value={formData.twitter}
              onChange={(e) => setFormData({...formData, twitter: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">LinkedIn</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Podcast</label>
            <input
              type="url"
              placeholder="https://podcast-url.com"
              value={formData.podcast}
              onChange={(e) => setFormData({...formData, podcast: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Leader'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PmLeadersList() {
  const leaders = useQuery(api.queries.getAllPmLeaders);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  if (leaders === undefined) {
    return (
      <div className="loading">
        <div>Loading PM leaders...</div>
      </div>
    );
  }

  // Filter leaders based on search term
  const filteredLeaders = leaders.filter(leader => 
    leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container px-4 py-8">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Cerebro</h1>
        <p className="hero-subtitle">Discover and explore influential Product Management thought leaders</p>
        <p className="hero-description">
          A curated database of PM leaders, their insights, and contributions to the product community.
        </p>
      </div>
      
      {/* Search and Filter */}
      <SearchAndFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showAddModal={showAddModal}
        onShowAddModal={setShowAddModal}
      />
      
      {/* Results Summary */}
      <div className="results-summary">
        <p className="count">
          {searchTerm ? 
            `${filteredLeaders.length} of ${leaders.length} leaders found` :
            `${leaders.length} leaders in database`
          }
        </p>
      </div>
      
      {/* Leaders Grid */}
      <div className="grid grid-cols-1 grid-cols-2 grid-cols-3">
        {filteredLeaders.map((leader) => (
          <PmLeaderCard key={leader._id} leader={leader} />
        ))}
      </div>
      
      {/* No Results */}
      {filteredLeaders.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No leaders found matching "{searchTerm}"</p>
          <p>Try a different search term or add a new leader.</p>
        </div>
      )}
      
      {/* Add Leader Modal */}
      <AddLeaderModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ConvexProvider client={convex}>
      <div className="min-h-screen">
        <PmLeadersList />
      </div>
    </ConvexProvider>
  );
}

export default App
