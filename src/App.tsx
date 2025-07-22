import React from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProfileDetail from './pages/ProfileDetail';
import VerificationDashboard from './pages/VerificationDashboard';
import SuggestedEdits from './pages/SuggestedEdits';
import AddPerson from './pages/AddPerson';
import DesignSystem from './pages/DesignSystem';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<ProfileDetail />} />
        <Route path="/verify" element={<VerificationDashboard />} />
        <Route path="/suggested-edits" element={<SuggestedEdits />} />
        <Route path="/add" element={<AddPerson />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </Layout>
  );
}

export default App;