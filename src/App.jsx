import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KnowledgePage from './pages/KnowledgePage/index.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KnowledgePage />} />
      </Routes>
    </Router>
  );
}

export default App;