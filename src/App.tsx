import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Team = React.lazy(() => import('./pages/Team'));
const MemberDetail = React.lazy(() => import('./pages/MemberDetail'));
const Contributors = React.lazy(() => import('./pages/Contributors'));
const Events = React.lazy(() => import('./pages/Events'));
const News = React.lazy(() => import('./pages/News'));
const NewsDetail = React.lazy(() => import('./pages/NewsDetail'));
const Research = React.lazy(() => import('./pages/Research'));
const ResearchDetail = React.lazy(() => import('./pages/ResearchDetail'));
const WriteResearch = React.lazy(() => import('./pages/WriteResearch'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));

const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:id" element={<MemberDetail />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/contributors/:id" element={<MemberDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:id" element={<ResearchDetail />} />
            <Route path="/research/write" element={<WriteResearch />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
