// src/components/Header.js
import React from 'react';

function Header() {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="container">
                    <div className="nav-container">
                        <div className="nav-logo">
                            <i className="fas fa-crown"></i>
                            <span>Queen of Her Yard</span>
                        </div>
                        <div className="nav-menu" id="nav-menu">
                            <a href="#home" className="nav-link active">Home</a>
                            <a href="#about" className="nav-link">About</a>
                            <a href="#businesses" className="nav-link">Businesses</a>
                            <a href="#success-stories" className="nav-link">Success Stories</a>
                            <a href="#faqs" className="nav-link">FAQs</a>
                            <a href="#subscription" className="nav-link">Subscribe</a>
                            <a href="#contact" className="nav-link">Contact</a>
                            <a href="#" className="nav-link auth-link" id="auth-link">Login</a>
                            {/* Dark Mode Toggle */}
                            <div className="theme-toggle-container">
                                <button className="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                                    <span className="theme-toggle-sun">
                                        <i className="fas fa-sun"></i>
                                    </span>
                                    <span className="theme-toggle-moon">
                                        <i className="fas fa-moon"></i>
                                    </span>
                                    <span className="theme-toggle-thumb"></span>
                                </button>
                            </div>
                        </div>
                        <div className="hamburger" id="hamburger">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
