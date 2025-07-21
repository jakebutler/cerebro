import React from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProfileDetail from './pages/ProfileDetail';
function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile/:id" element={<ProfileDetail />} />
        {/* Define other routes in a similar manner */}
        </Routes>
      </Layout>
  );
}

export default App;
