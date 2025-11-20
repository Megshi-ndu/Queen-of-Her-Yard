// src/components/Hero.js
import React from 'react';

function Hero() {
    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            <span className="typing-container">
                                <span className="typing-text" id="typing-text">Empowering Women Entrepreneurs</span>
                                <span className="typing-cursor">|</span>
                            </span>
                        </h1>
                        <h2 className="hero-subtitle">Empowering Women Entrepreneurs in Kenya</h2>
                        <p className="hero-description">
                            Queen of Her Yard provides a platform for women to showcase their businesses, connect with
                            customers, and grow their enterprises through digital tools and community support.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn btn-primary" id="explore-btn">
                                <i className="fas fa-search"></i>
                                Explore Businesses
                            </button>
                            <button className="btn btn-secondary" id="join-community-btn">
                                <i className="fas fa-users"></i>
                                Join Our Community
                            </button>
                        </div>
                    </div>
                    <div className="hero-image">
                        {/* Floating cards removed from hero section as requested */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
