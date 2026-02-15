// import React from 'react'; // Removed unused import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import Team from './pages/Team';
import MemberDetail from './pages/MemberDetail';

import About from './pages/About';
import Contributors from './pages/Contributors';

import Events from './pages/Events';
import Research from './pages/Research';
import ResearchDetail from './pages/ResearchDetail';
import WriteResearch from './pages/WriteResearch';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<MemberDetail />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/contributors/:id" element={<MemberDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:id" element={<ResearchDetail />} />
          <Route path="/research/write" element={<WriteResearch />} />
          {/* Add other routes here */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
