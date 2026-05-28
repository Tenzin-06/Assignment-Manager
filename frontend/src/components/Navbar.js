import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const close    = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          Assignment Manager
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/"            className={`nav-link ${isActive('/')            ? 'active' : ''}`} onClick={close}>Dashboard</Link>
          </li>
          <li>
            <Link to="/assignments" className={`nav-link ${isActive('/assignments') ? 'active' : ''}`} onClick={close}>Assignments</Link>
          </li>
          <li>
            <Link to="/add"         className={`nav-link nav-cta ${isActive('/add') ? 'active' : ''}`} onClick={close}>New assignment</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
