import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';

import { BreweryProvider } from './context/BreweryContext';

import Dashboard from './pages/Dashboard';
import BreweryDetail from './pages/BreweryDetail';
import About from './pages/About';

import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BreweryProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="brewery/:id" element={<BreweryDetail />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </HashRouter>
    </BreweryProvider>
  </React.StrictMode>
);
