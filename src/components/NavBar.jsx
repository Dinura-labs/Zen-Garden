import { useState } from 'react';
import './NavBar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="zen-symbol">☸</span>
          <span className="site-name">Buddhist Oasis</span>
        </div>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="#home" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</a>
          </li>
          <li className="navbar-item">
            <a href="#gallery" className="navbar-link" onClick={() => setMenuOpen(false)}>Gallery</a>
          </li>
          <li className="navbar-item">
            <a href="#meditation" className="navbar-link" onClick={() => setMenuOpen(false)}>Meditation</a>
          </li>
          <li className="navbar-item">
            <a href="#about" className="navbar-link" onClick={() => setMenuOpen(false)}>About</a>
          </li>
          <li className="navbar-item">
            <a href="#contact" className="navbar-link" onClick={() => setMenuOpen(false)}>Contact</a>
          </li>
        </ul>

        <button
          className="navbar-toggle"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

