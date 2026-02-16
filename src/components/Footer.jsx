import { useState } from 'react';
import './Footer.css';

function Footer() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <footer className={`footer ${isCollapsed ? 'collapsed' : ''}`}>
            <button
                className="footer-toggle"
                onClick={toggleCollapse}
                aria-label={isCollapsed ? 'Expand footer' : 'Collapse footer'}
            >
                <span className="toggle-icon">{isCollapsed ? '▲' : '▼'}</span>
                <span className="toggle-text">{isCollapsed ? 'Show' : 'Hide'} Footer</span>
            </button>

            <div className="footer-content">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3 className="footer-heading">
                            <span className="dharma-icon">☸</span>
                            Buddhist Oasis
                        </h3>
                        <p className="footer-description">
                            A digital sanctuary for mindfulness and inner peace.
                            Discover the path to enlightenment through meditation and reflection.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="section-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home" className="footer-link">Home</a></li>
                            <li><a href="#gallery" className="footer-link">Gallery</a></li>
                            <li><a href="#meditation" className="footer-link">Meditation</a></li>
                            <li><a href="#about" className="footer-link">About</a></li>
                            <li><a href="#contact" className="footer-link">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="section-title">Connect</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Community</a></li>
                            <li><a href="#" className="footer-link">Resources</a></li>
                            <li><a href="#" className="footer-link">Support</a></li>
                            <li><a href="#" className="footer-link">Newsletter</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="section-title">Follow the Path</h4>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <span className="social-icon">📘</span>
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <span className="social-icon">🐦</span>
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <span className="social-icon">📷</span>
                            </a>
                            <a href="#" className="social-link" aria-label="YouTube">
                                <span className="social-icon">▶️</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © 2026 Buddhist Oasis. All rights reserved.
                        <span className="divider">•</span>
                        Find peace within.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
