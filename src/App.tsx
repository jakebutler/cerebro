import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Import our page components
import Home from './pages/Home'
import ProfileDetail from './pages/ProfileDetail'
import VerificationDashboard from './pages/VerificationDashboard'
import SuggestedEdits from './pages/SuggestedEdits'
import AddPerson from './pages/AddPerson'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile/:id" element={<ProfileDetail />} />
        <Route path="verify" element={<VerificationDashboard />} />
        <Route path="suggested-edits" element={<SuggestedEdits />} />
        <Route path="add" element={<AddPerson />} />
      </Route>
    </Routes>
  )
}

export default App