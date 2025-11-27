import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ExploreBusinesses from './components/ExploreBusinesses';
import JoinCommunity from './components/JoinCommunity';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/explore" element={<ExploreBusinesses />} />
      <Route path="/join" element={<JoinCommunity />} />
    </Routes>
  );
}

export default App;
