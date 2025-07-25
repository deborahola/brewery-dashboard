import { Outlet } from 'react-router-dom'

import Sidebar from './components/Sidebar'

import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App
