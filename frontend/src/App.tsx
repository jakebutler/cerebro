import { ConvexProvider, useQuery, useMutation } from "convex/react";
import { useState } from "react";
import convex from "./convex";
import { api } from "../convex/_generated/api";

// Define the PmLeader type
type PmLeader = {
  _id: string;
  name: string;
  skills: string;
  bio: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  podcast?: string;
  blogs?: string[];
  other_social?: string[];
  needs_verification?: string[];
};

function PmLeaderCard({ leader }: { leader: PmLeader }) {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground mb-1">{leader.name}</h3>
          <p className="text-sm text-muted-foreground">{leader.skills}</p>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">{leader.bio}</p>
        
        <div className="flex flex-wrap gap-2">
          {leader.website && (
            <a href={leader.website} target="_blank" rel="noopener noreferrer" 
               className="text-primary hover:text-primary/80 text-sm underline-offset-4 hover:underline">
              Website
            </a>
          )}
          {leader.twitter && (
            <a href={leader.twitter} target="_blank" rel="noopener noreferrer" 
               className="text-primary hover:text-primary/80 text-sm underline-offset-4 hover:underline">
              Twitter
            </a>
          )}
          {leader.linkedin && (
            <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" 
               className="text-primary hover:text-primary/80 text-sm underline-offset-4 hover:underline">
              LinkedIn
            </a>
          )}
          {leader.podcast && (
            <a href={leader.podcast} target="_blank" rel="noopener noreferrer" 
               className="text-primary hover:text-primary/80 text-sm underline-offset-4 hover:underline">
              Podcast
            </a>
          )}
        </div>
        
        {leader.blogs && leader.blogs.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Blogs:</p>
            <div className="flex flex-wrap gap-1">
              {leader.blogs.map((blog: string, index: number) => (
                <a key={index} href={blog} target="_blank" rel="noopener noreferrer" 
                   className="text-xs text-primary hover:text-primary/80 underline-offset-4 hover:underline">
                  Blog {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {leader.needs_verification && leader.needs_verification.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2">
            <p className="text-xs text-yellow-800">
              Needs verification: {leader.needs_verification.join(", ")}
            </p>
          </div>
        )}
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-card rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">Add New PM Leader</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground text-xl">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Skills *</label>
              <input
                type="text"
                required
                placeholder="e.g., Product strategy, growth, consumer SaaS"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio *</label>
              <textarea
                required
                placeholder="Brief description of their background and expertise"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical min-h-[4rem]"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Website</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Twitter</label>
              <input
                type="url"
                placeholder="https://x.com/username"
                value={formData.twitter}
                onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">LinkedIn</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Podcast</label>
              <input
                type="url"
                placeholder="https://podcast-url.com"
                value={formData.podcast}
                onChange={(e) => setFormData({...formData, podcast: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end mt-8">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 bg-background text-foreground border border-input rounded-md text-base hover:bg-accent transition-colors" 
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-base font-medium hover:bg-primary/90 transition-colors disabled:opacity-50" 
              disabled={isSubmitting}
            >
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
  const filteredLeaders = leaders.filter((leader: PmLeader) => 
    leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 py-8">
          <h1 className="text-5xl font-bold text-foreground mb-4">Cerebro</h1>
          <p className="text-xl text-muted-foreground mb-2">Product Management Thought Leaders</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Discover and explore influential voices in product management. 
            Find leaders, read their insights, and contribute to our growing database.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="flex gap-4 items-center max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search by name, skills, or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-input bg-background rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-base font-medium hover:bg-primary/90 transition-colors"
            >
              Add Leader
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            {searchTerm ? 
              `${filteredLeaders.length} of ${leaders.length} leaders found` :
              `${leaders.length} leaders in database`
            }
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeaders.map((leader) => (
            <PmLeaderCard key={leader._id} leader={leader} />
          ))}
        </div>
        
        {/* No Results */}
        {filteredLeaders.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">No leaders found matching "{searchTerm}"</p>
            <p className="text-muted-foreground">Try a different search term or add a new leader.</p>
          </div>
        )}
      </div>
      
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
