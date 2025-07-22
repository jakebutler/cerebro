# Cerebro

A curated database of influential Product Management thought leaders, their insights, and contributions to the product community.

## 🚀 Features

- **Search & Filter**: Real-time search across PM leaders by name, skills, and bio
- **Leader Profiles**: Comprehensive profiles with social links, blogs, and verification status
- **Add Leaders**: Community-driven form to suggest new PM thought leaders
- **Real-time Updates**: Powered by Convex for instant data synchronization
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Convex.dev (real-time database and API)
- **Styling**: Custom CSS (TailwindCSS integration planned)
- **Deployment**: Convex Cloud

## 📦 Project Structure

```
cerebro/
├── convex/                 # Backend (Convex)
│   ├── schema.ts          # Database schema
│   ├── queries.ts         # Data queries
│   ├── mutations.ts       # Data mutations
│   └── _generated/        # Auto-generated types
├── frontend/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.tsx        # Main application
│   │   ├── index.css      # Styles
│   │   └── convex.ts      # Convex client config
│   └── package.json
├── memory/                # Project documentation
│   ├── docs/              # Architecture & technical docs
│   └── tasks/             # Project planning & context
├── documentation/         # Source data
│   └── pm-thought-leaders.json
└── scripts/               # Utility scripts
    └── seed_pm_leaders.ts
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jacobbutler/cerebro.git
   cd cerebro
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Set up Convex**
   ```bash
   # In project root
   npx convex dev
   ```

5. **Configure environment variables**
   ```bash
   # In frontend directory
   cp .env.example .env.local
   # Update VITE_CONVEX_URL with your Convex deployment URL
   ```

6. **Start the development servers**
   ```bash
   # Terminal 1: Convex backend
   npx convex dev
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5177
   - Convex Dashboard: https://dashboard.convex.dev

## 📊 Database Schema

The application uses a single `pm_leaders` table with the following structure:

```typescript
{
  name: string;              // Leader's full name
  skills: string;            // Areas of expertise
  bio: string;               // Professional background
  website: string;           // Personal/company website
  blogs: string[];           // Blog URLs
  twitter: string;           // Twitter/X profile
  linkedin?: string;         // LinkedIn profile (optional)
  other_social: string[];    // Additional social links
  podcast?: string;          // Podcast URL (optional)
  needs_verification: string[]; // Fields requiring verification
}
```

## 🎯 Current Features

### ✅ Completed
- **Home Page**: Hero section, search, and leader grid
- **Search & Filter**: Real-time filtering across all leader data
- **Add Leader Form**: Modal form with validation and backend integration
- **Leader Cards**: Responsive cards with social links and verification indicators
- **Database Integration**: Full CRUD operations with Convex
- **Data Seeding**: Initial dataset of 11 PM thought leaders

### 🚧 Planned
- **Profile Viewer**: Individual leader detail pages
- **Verification Dashboard**: Admin interface for managing verification flags
- **Enhanced Styling**: TailwindCSS/shadcn-ui integration
- **Authentication**: User accounts and permissions
- **Advanced Search**: Filters by skills, verification status, etc.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add New Leaders**: Use the "Add Leader" form in the app
2. **Report Issues**: Create GitHub issues for bugs or feature requests
3. **Submit PRs**: Fork the repo and submit pull requests
4. **Improve Documentation**: Help expand and improve docs

## 📝 Development Notes

### Key Learnings
- Convex requires fully qualified function names for client calls
- `v.optional()` accepts `undefined` but not `null` - preprocessing required
- Custom CSS provided reliable fallback when TailwindCSS PostCSS had conflicts
- Environment variables must be prefixed with `VITE_` for Vite frontend

### Memory Bank System
This project uses a comprehensive memory bank system for documentation:
- `memory/docs/`: Architecture, technical details, requirements
- `memory/tasks/`: Project planning, active context, lessons learned

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Initial dataset curated from influential PM thought leaders
- Built with Convex for real-time capabilities
- Inspired by the need for a centralized PM community resource

---

**Cerebro** - Discover and explore influential Product Management thought leaders.
