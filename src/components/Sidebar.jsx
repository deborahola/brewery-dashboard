import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen((o) => !o);
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <button
          title="Toggle Navigation Sidebar"
          className="hamburger-btn"
          onClick={toggle}
        >
          ☰
        </button>
        <span className="mobile-title">Brewery Dashboard</span>
      </div>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>🍺 Brewery Dashboard 🍺</h1>
          <p className="subtitle">Explore breweries across the U.S.!</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            title="Main Dashboard Page"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/about"
            title="About Page"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
